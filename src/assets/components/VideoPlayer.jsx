import { useEffect, useRef, useState } from "react";
import { videosIds } from "../../constants/videosIds";
import './VideoPlayer.css'

export default function VideoPlayer() {
    const [visibleVideos, setVisibleVideos] = useState([]);
    const observerRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [iframeReady, setIframeReady] = useState({});

    const handleIframeLoad = (videoId) => {
        setIframeReady((prev) => ({ ...prev, [videoId]: true }));
    };

    // Smooth Scroll 
    const smoothScroll = (targetElement, duration = 800) => {
        const container = document.querySelector(".video-container");
        const start = container.scrollTop;
        const end = targetElement.offsetTop - container.offsetTop;
        const distance = end - start;
        const startTime = performance.now();

        const smoothStep = (start, end, point) => {
            return start + (end - start) * point * point * (3 - 2 * point);
        };

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const nextScrollTop = smoothStep(start, end, progress);

            container.scrollTo(0, nextScrollTop);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        requestAnimationFrame(animateScroll);
    }

    // Intersection Observer for lazy
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const videoId = entry.target.getAttribute("data-video-id");
                    const iframe = entry.target.querySelector("iframe");

                    if (entry.isIntersecting) {
                        if (!visibleVideos.includes(videoId)) {
                            setVisibleVideos((prev) => [...prev, videoId]);
                        }

                        const index = Number(entry.target.getAttribute("data-index"));
                        setCurrentVideoIndex(index);

                        if (iframe && iframeReady[videoId]) {
                            iframe.contentWindow.postMessage(
                                '{"event": "command","func":"playVideo","args":""}',
                                "*"
                            );
                        }
                    } else {
                        if (iframe && iframeReady[videoId]) {
                            iframe.contentWindow.postMessage(
                                '{"event":"command","func":"pauseVideo","args":""}',
                                "*"
                            );
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        const videoElements = document.querySelectorAll(".video-wrapper");
        videoElements.forEach((el) => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [visibleVideos, iframeReady]);


    //Key Events
    useEffect(() => {
        const handleKeyDown = (event) => {
            event.preventDefault();
            const videoElements = document.querySelectorAll(".video-wrapper");
            if (videoElements.length === 0) return;

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                const nextIndex = Math.min(currentVideoIndex + 1, videoElements.length - 1);
                setCurrentVideoIndex(nextIndex);
                smoothScroll(videoElements[nextIndex]);
            } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                const prevIndex = Math.max(currentVideoIndex - 1, 0);
                setCurrentVideoIndex(prevIndex);
                smoothScroll(videoElements[prevIndex]);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [currentVideoIndex]);

    // Scroll Events
    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault()
            const videoElements = document.querySelectorAll(".video-wrapper");
            if (event.deltaY > 0) {
                const nextIndex = Math.min(currentVideoIndex + 1, videoElements.length - 1);
                setCurrentVideoIndex(nextIndex);
                smoothScroll(videoElements[nextIndex]);
            } else {
                const prevIndex = Math.max(currentVideoIndex - 1, 0);
                setCurrentVideoIndex(prevIndex);   
                smoothScroll(videoElements[prevIndex])
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
                <div key={index} className="video-wrapper" data-video-id={videoId} data-index={index}>
                    {visibleVideos.includes(videoId) ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                            frameBorder="0"
                            allow="autoplay"
                            loading="lazy"
                            onLoad={() => handleIframeLoad(videoId)}
                        />
                    ) : (
                        <p className="video-placeholder">Loading...</p>
                    )}
                </div>
            ))}
        </div>
    )
}