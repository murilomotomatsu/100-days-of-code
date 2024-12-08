import { useEffect, useState } from "react"
import rankService from "../../services/firebase-services";


export default function RankList() {
    const [quizRank, setQuizRank] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRank = async () => {
        try {
            setLoading(true)

            const quizData = await rankService.getRank('quiz');
            const sortedQuizRank = Object.values(quizData || {})
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);

            setQuizRank(sortedQuizRank);
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
                <h3>Top 10 - Quiz</h3>
                <ul>
                    {quizRank.map((entry, index) => (
                        <li key={index}>
                            <strong>{index + 1}-</strong> {entry.nome} - {entry.score} points

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}