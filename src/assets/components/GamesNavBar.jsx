import './Navbar.css';

export default function GamesNavBar({ onSelectGame }) {

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <button onClick={() => onSelectGame('Hangman')}>Hangman</button>
                    <button onClick={() => onSelectGame('Quiz')}>Quiz</button>
                </li>
            </ul>
        </nav>
    )
}