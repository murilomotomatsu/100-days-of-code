import './VideoList.css'
import Logo from '../images/logo.webp'

export default function VideoList() {
    const videosIds = [
        'Z3RAcq_goZI',
        'b5d1uwiPehw',
    ];

    const videos = Array.from({ length: 10 }, (_, i) => {

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


    return (

        <div className="video-list">
            {videos.map((video) => (
                <div className="video-item">
                    {video.youtubeId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1`}
                            frameborder="0"
                            allowFullScreen
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