import { useEffect, useState } from "react"
import './Sled.css'
import sled from '../images/sled.svg'



export default function Sled() {
    const [position, setPosition] = useState({ top: window.innerHeight, left: 0 });
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        const updatePosition = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll;

            setPosition({
                top: Math.min(window.innerHeight * (1 - progress), window.innerHeight * 0.8),
                left: Math.max(window.innerWidth * progress, 0),
            });
            setHeart(progress >= 1);
        };
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, []);

    return (
        <div
            className={`sled-container ${heart ? "heart" : ""}`}
            style={
                heart ? { top: "50%", left: "50%", transform: "translate(-50%, 50%)" }
                    : { top: `${position.top}px`, left: `${position.left}px` }
            }
        >
            {heart ? (
                <div className="heart-shape"></div>
            ) : (
                <img src={sled} alt="Sled" className="sled" />
            )}

        </div>
    )
}