import './FooterYt.css'
import HomeLogo from '../images/YTHome.svg'
import Shorts from '../images/YTShorts.svg'
import Subs from '../images/YTVideos.svg'
import Logo from '../images/YTLogo.svg'


// Footer navbar trying to clone YT layout
export default function FooterNav({ onNavClick }) {
    const itens = [
        { text: 'Home', icon: HomeLogo, link: '/100-days-of-code/' },
        { text: 'Shorts', icon: Shorts, link: '#', view: 'VideoPlayer' },
        { text: 'Subscribed', icon: Subs, link: '#', view: 'VideoList' },
        { text: 'You', icon: Logo, link: '#' },
    ]

    return (
        <nav className="footeryt">
            {itens.map((item, index) => (
                <div
                    className="footeryt-item"
                    key={index}
                    onClick={() => item.view && onNavClick(item.view)}
                >
                    <a href={item.link}>
                        <img
                            src={item.icon}
                            alt={item.text}
                            className="footeryt-icon"
                        />
                        {item.text}
                    </a>
                </div>
            ))}


        </nav>
    )
}
