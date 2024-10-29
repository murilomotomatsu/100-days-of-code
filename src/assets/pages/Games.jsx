import { useState } from "react";
import GamesNavBar from "../components/GamesNavBar";
import Navbar from "../components/Navbar";
import QuizGame from "../components/QuizComponent";
import Hangman from "../components/Hangman";
import MemoryGame from "../components/Memory";

//Games page
export default function Games() {
    const [activeGame, setActiveGame] = useState('Hangman');

    const selectGame = (game) => {
        setActiveGame(game);
    };

    return(
        <>
            <Navbar />
            <GamesNavBar onSelectGame={selectGame}/>
            {activeGame === 'Quiz' && <QuizGame />}
            {activeGame === 'Hangman' && <Hangman />}
            {activeGame === 'Memory' && <MemoryGame />}
        </>
    )
}