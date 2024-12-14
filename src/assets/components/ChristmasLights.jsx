import './ChristmasLights.css'

export default function ChristmasLights() {
    const lights = Array.from({ length: 15 });
    return (
        <ul className="lightrope">
            {lights.map((_, index) => (
                <li
                key={index}
                className={`light color-${index % 3}`}></li>
            ))}
        </ul>
    )
}