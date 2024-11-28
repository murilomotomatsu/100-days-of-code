import { useEffect, useState } from "react";
import { videosIds } from "../../constants/videosIds";
import './VideoPlayer.css'

export default function VideoPlayer() {
    const [visibleVideos, setVisibleVideos] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const videoId = entry.target.getAttribute("data-video-id");
                        if (!visibleVideos.includes(videoId)) {
                            setVisibleVideos((prev) => [...prev, videoId]);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        const videoElements = document.querySelectorAll(".vidoe-placeholder");
        videoElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [visibleVideos])

    return (
        <div className="video-container">
            {videosIds.map((videoId, index) => (
                <div key={index} className="video-wrapper" data-video-id={videoId}>
                    {visibleVideos.includes(videoId) ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameborder="0"
                            loading="lazy"
                        />
                        
                    ) : (
                        <div className="video-placeholder">
                            Loading...
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}