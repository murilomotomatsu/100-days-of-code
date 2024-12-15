import './VideoList.css'
import Logo from '../images/logo.webp'
import { videosIds } from '../../constants/videosIds';
import { useEffect, useState, useRef } from 'react';

export default function VideoList() {
    const [visibleVideos, setVisibleVideos] = useState([]);

    const videos = Array.from({ length: 100 }, (_, i) => {

        const youtubeId = videosIds[i] || null;
        const releaseDate = new Date(2024, 9, 18 + i).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

        return {
            id: i,
            title: `Day ${i + 1}`,
            description: youtubeId ?
                `My progress of day ${i + 1} in 100 days of code`
                :
                `Wait for ${releaseDate}`,
            views: youtubeId ?
                `${Math.floor(Math.random() * 1000) + 500} M views`
                :
                '0 views',
            youtubeId,
            releaseDate,
        }
    })

    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const videoId = parseInt(entry.target.getAttribute('data-id'), 10);
                    if (entry.isIntersecting) {
                        setVisibleVideos((prev) => (prev.includes(videoId) ? prev : [...prev, videoId]));
                    } else {
                        setVisibleVideos((prev) => prev.filter((id) => id !== videoId));
                    }
                });
            },
            { threshold: 0.15 }
        );
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach((item) => observerRef.current.observe(item));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (

        <div className="video-list">
            {videos.map((video) => (
                <div className="video-item" data-id={video.id} key={video.id}>
                    {visibleVideos.includes(video.id) && video.youtubeId ?  (
                        <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1`}
                            frameBorder="0"
                            allowFullScreen
                            loading='lazy'
                        />

                    ) :
                        (
                            <img
                                className='thumb'
                                src={`https://placeholder.pics/svg/300/DEDEDE/555555/${encodeURIComponent(video.releaseDate)}`}
                            />
                        )}

                    <div className="video-descriptionarea">
                        <img
                            src={Logo}
                            alt=""
                            className="video-logo"
                        />
                        <div>
                            <p className="video-title">{video.title}</p>
                            <p className="video-description">{video.description} - {video.views}</p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}