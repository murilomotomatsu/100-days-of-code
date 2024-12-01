import { useEffect, useRef, useState } from "react";
import { videosIds } from "../../constants/videosIds";
import './VideoPlayer.css'

export default function VideoPlayer() {
    const [visibleVideos, setVisibleVideos] = useState([]);
    const observerRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Intersection Observer for lazy 
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

    //Key Events
    useEffect(() => {
        const handleKeyDown = (event) => {
            event.preventDefault();
            const videoElements = document.querySelectorAll(".video-wrapper");
            if (videoElements.length === 0) return;

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                const nextIndex = Math.min(currentVideoIndex + 1, videoElements.length - 1);
                setCurrentVideoIndex(nextIndex);
                videoElements[nextIndex].scrollIntoView({ behavior: "smooth"});
            } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                const prevIndex = Math.max(currentVideoIndex -1, 0);
                setCurrentVideoIndex(prevIndex);
                videoElements[prevIndex].scrollIntoView({ behavior: "smooth"});
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [currentVideoIndex]);
    
    // Scroll Events
    useEffect(() => {
        const handleWheel= (event) => {
            const videoElements = document.querySelectorAll(".video-wrapper");
            if (event.deltaY > 0) {
                const nextIndex = Math.min(currentVideoIndex + 1, videoElements.length - 1);
                setCurrentVideoIndex(nextIndex);
                videoElements[nextIndex].scrollIntoView({ behavior: "smooth"});
            } else {
                const prevIndex = Math.max(currentVideoIndex -1, 0);
                setCurrentVideoIndex(prevIndex);
                videoElements[prevIndex].scrollIntoView({ behavior: "smooth"});
            }
        };
        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [currentVideoIndex]);

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
                        <p className="video-placeholder">Loading...</p>
                    )}
                </div>
            ))}
        </div>
    )
}