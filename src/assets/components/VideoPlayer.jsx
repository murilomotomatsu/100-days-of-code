import { useEffect, useRef, useState } from "react";
import { videosIds } from "../../constants/videosIds";
import './VideoPlayer.css'

export default function VideoPlayer() {
    const [visibleVideos, setVisibleVideos] = useState([]);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const videoId = entry.target.getAttribute("data-video-id");
                        if (!visibleVideos.includes(videoId)) {
                            setVisibleVideos((prev) => [...prev, videoId]);
                        }
                        return prev;
                    }
                });
            },
            { threshold: 0.1 }
        );
        const videoElements = document.querySelectorAll(".video-wrapper");
        videoElements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [])

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
                            <p>Loading...</p>                 
                    )}
                </div>
            ))}
        </div>
    )
}