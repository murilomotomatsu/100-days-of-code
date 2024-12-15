import './ChristmasLights.css'

const LIGHT_SPACING = 50;

export default function ChristmasLights() {
    const lightCount = Math.ceil(window.innerWidth / LIGHT_SPACING)
    const lights = Array.from({ length: lightCount });

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