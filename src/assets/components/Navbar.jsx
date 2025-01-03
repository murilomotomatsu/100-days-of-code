import './Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar() {

    return(

        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/videos">Videos</Link></li>
                <li><Link to="/about-me">About</Link></li>
                <li><Link to="/chat">Chat GPT</Link></li>
                <li><Link to="/games">Games</Link></li>
            </ul>
        </nav>
    )
}