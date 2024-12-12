import { memo, useEffect, useState } from "react"
import rankService from "../../services/firebase-services";
import './RankList.css'


export default function RankList() {
    const [quizRank, setQuizRank] = useState([]);
    const [memoryRank, setMemoryRank] = useState([]);
    const [hangmanRank, setHangmanRank] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRank = async () => {
        try {
            setLoading(true)

            const quizData = await rankService.getRank('quiz');
            const memoryData = await rankService.getRank('memory');
            const hangmanData = await rankService.getRank('hangman');

            const sortedQuizRank = Object.values(quizData || {})
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);

            const sortedMemoryRank = Object.values(memoryData || {})
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
            
            const sortedHangmanRank = Object.values(hangmanData || {})
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);

            setMemoryRank(sortedMemoryRank);
            setQuizRank(sortedQuizRank);
            setHangmanRank(sortedHangmanRank);
        } catch (error) {
            console.error('Error on load rank List:', error);
        }
        setLoading(false)
    };

    useEffect(() => {
        fetchRank();
    }, []);

    if (loading) {
        return <div>Loading Ranking...</div>;
    }



    return (
        <div className="rank-container">
            <h2>Ranking</h2>
            <div className="rank-section">
                <div className="rank-list">
                    <h3>Top 10 - Quiz Game</h3>
                    <ul>
                        {quizRank.map((entry, index) => (
                            <li key={index}>
                                <strong>{index + 1}-</strong> {entry.nome} - {entry.score} points

                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rank-list">
                    <h3>Top 10 - Memory Game</h3>
                    <ul>
                        {memoryRank.map((entry, index) => (
                            <li key={index}>
                                <strong>{index + 1}-</strong> {entry.nome} - {entry.score} seconds

                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rank-list">
                    <h3>Top 10 - Hangman Game</h3>
                    <ul>
                        {hangmanRank.map((entry, index) => (
                            <li key={index}>
                                <strong>{index + 1}-</strong> {entry.nome} - {entry.score} points

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}