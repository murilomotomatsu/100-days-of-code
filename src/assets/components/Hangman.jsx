import { useState } from "react"
import './Hangman.css'

export default function Hangman() {
    const [word, setWord] = useState('HANGMAN');
    const [remainingAttempts, setRemainingAttempts] = useState('6')
    const [attemptedLetters, setAttemptedLetters] = useState([]);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ';

    const selectLetter = (letter) => {
        setAttemptedLetters((prev) => [...prev, letter]);
        if (!word.includes(letter)) {
            setRemainingAttempts((prev) => prev - 1);
        }
    }

    const resetGame = () => {
        setRemainingAttempts(6);
        setAttemptedLetters([]);
    };

    if (remainingAttempts <= 0) {
        return (
            <>
                <div className="hangman-container">
                    <h1>You LOST!</h1>
                    <h3>The word is {word}</h3>
                    <button onClick={resetGame}>Retry</button>

                </div>

            </>
        )
    }

    if (word.split('').every((letter) => attemptedLetters.includes(letter))) {
        return (
            <div className="hangman-container">
                <h1>You WON!</h1>
                <h3>The word is {word}</h3>
                <button onClick={resetGame}>Play Again</button>
            </div>
        )
    }

    return (
        <div className="hangman-container">
            <h1>Hangman Game</h1>
            <h4>Remaining attempts: {remainingAttempts}</h4>
            <div className="word">
                {word.split('').map((letter, i) => (
                    attemptedLetters.includes(letter) ? <span key={i}>{letter}</span> : <span key={i}>_</span>
                ))}
            </div>
            <div className="alphabet">
                {[...alphabet].map((letter) => (
                    <button
                        key={letter}
                        onClick={() => selectLetter(letter)}
                        disabled={attemptedLetters.includes(letter)}
                    >
                        {letter}
                    </button>
                ))}


            </div>

        </div>
    )
}