import { useEffect, useState } from "react";

import './Memory.css'
import rankService from "../../services/firebase-services";


export default function MemoryGame() {
    const figures = ['🍉', '🍒', '🍓', '🍌', '🍐', '🍎'];
    const shuffleFigures = () => {
        return [...figures, ...figures]
            .sort(() => Math.random() - 0.5)
            .map((content, id) => ({ id, content, flipped: false, matched: false }));
    };

    const [cards, setCards] = useState(shuffleFigures);
    const [flippedCards, setFlippedCards] = useState([]);
    const [finished, setFinished] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;

            if (first.content === second.content) {
                setCards(prevCards => prevCards.map(card =>
                    card.content === first.content ? { ...card, matched: true, flipped: true } : card
                ));
            } else {
                setTimeout(() => {
                    setCards(prevCards => prevCards.map(card =>
                        card.id === first.id || card.id === second.id ? { ...card, flipped: false } : card
                    ));
                }, 1000);
            }
            setFlippedCards([]);
        }
    }, [flippedCards]);

    useEffect(() => {
        if (cards.every(card => card.matched)) {
            setFinished(true)
            setEndTime(Date.now());
        }
    }, [cards]);

    const flipCard = (index) => {
        setCards(prevCards => prevCards.map((card, i) =>
            i === index ? { ...card, flipped: true } : card
        )
        );
        setFlippedCards(prev => [...prev, cards[index]]);
    };

    const restartGame = () => {
        setCards(shuffleFigures());
        setFlippedCards([]);
        setFinished(false);
        setStartTime(Date.now());
        setEndTime(null);
    };

    const elapsedTime = () => {
        if (!startTime) return "00:00";
        const now = finished ? endTime : Date.now();
        const totalSeconds = Math.floor((now - startTime) / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (!finished && startTime === null) {
            setStartTime(Date.now());
        }
    }, [startTime, finished]);

    if (finished) {
        return (
            <div className="memory-game-end">
                <h1>You WON!</h1>
                <p>Your Time: {elapsedTime()}</p>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter Your Name!"
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => rankService.addRank('memory', name, elapsedTime(), Date.now())}> Submit on Rank!</button>
                <button
                    onClick={restartGame}
                >Restart Game</button>
            </div>
        )
    }



    return (
        <div className="memory-game">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
                    onClick={() => flipCard(card.id)}
                >
                    <div className="card-content">
                        {card.flipped ? card.content : '❔'}
                    </div>
                </div>
            ))}
        </div>
    )
}