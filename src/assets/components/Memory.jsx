import { useEffect, useState } from "react";
import './Memory.css'


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
    }

    if (finished) {
        return (
            <div className="memory-game-end">
                <h1>You WON!</h1>
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