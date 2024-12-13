import { useState } from 'react'
import './QuizComponent.css'
import { useEffect } from 'react';
import { useRef } from 'react';
import he from 'he';
import rankService from '../../services/firebase-services';


//Quiz Game
export default function QuizGame() {
    const [question, setQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false)
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [name, setName] = useState('');
    const isMounted = useRef(false);

    const resetQuiz = async () => {
        setScore(0);
        setQuizFinished(false);
        setAnsweredQuestions([]);
        setName('');
        await getQuestion();
    };

    const getQuestion = async () => {
        while (true) {
            const response = await fetch('https://opentdb.com/api.php?amount=1');
            if (response.status === 429) {
                await new Promise(resolse => setTimeout(resolse, 2500)) // delay if too many requests
            }
            if (response.ok) {
                const data = await response.json();
                setQuestion(data.results[0]);
                break
            }
        }
    };

    useEffect(() => {
        if (!isMounted.current) {
            getQuestion();
            isMounted.current = true;
        }

    }, []);

    const handleAnswer = (answer) => {
        setAnsweredQuestions(prev => [
            ...prev,
            {
                question: question.question,
                correct_answer: question.correct_answer,
                user_anwser: answer,
                category: question.category,
                difficulty: question.difficulty,
            },
        ]);

        if (answer === question.correct_answer) {
            setScore(prevScore => prevScore + 1);
            getQuestion();
        } else {
            setQuizFinished(true)
        }
    }

    if (!question) {
        return (
            <div className="quiz-container">
                <h3>Loading questions...</h3>
            </div>
        )
    }

    if (quizFinished) {
        return (
            <div className="quiz-container">
                <h2>End of Game!</h2>
                <h2>Your Score: {score}</h2>
                <input
                    type="text"
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => {
                    rankService.addRank('quiz', name, score, Date.now());
                    resetQuiz();
                }}>Submit Score on Rank</button>
                {answeredQuestions.map((answer, i) => (
                    <div
                        key={i}
                        className={answer.user_anwser === answer.correct_answer ? 'correct-answer' : 'incorrect-answer'}

                    >
                        <h3>{he.decode(answer.question)}</h3>
                        {answer.user_anwser === answer.correct_answer ? (
                            <p>Your and Correct Answer: {he.decode(answer.user_anwser)}</p>
                        ) : (
                            <>
                                <p>Your Answer: {he.decode(answer.user_anwser)}</p>
                                <p>Correct Anwer: {he.decode(answer.correct_answer)}</p>
                            </>
                        )}
                    </div>
                ))}
                <button className='restart-button' onClick={resetQuiz}>Restart Quiz</button>
            </div>

        )
    }

    return (
        <div className="quiz-container">
            <h3>{he.decode(question.question)}</h3>
            <div className="answer">
                {[...question.incorrect_answers, question.correct_answer].sort().map((answer, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(answer)}
                    >
                        {he.decode(answer)}
                    </button>

                ))}
            </div>
            <p className="quiz-description">{he.decode(question.category)} - {he.decode(question.difficulty)}</p>
        </div>
    )
}