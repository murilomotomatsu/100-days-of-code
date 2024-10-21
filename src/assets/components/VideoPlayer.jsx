import { videosIds } from "../../constants/videosIds";
import './VideoPlayer.css'

export default function VideoPlayer() {

    return (
        <div className="video-container">
            {videosIds.map((videoId, index) => (
                <div key={index} className="video-wrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameborder="0">                        
                    </iframe>
                </div>
            ))}
        </div>
    )
}