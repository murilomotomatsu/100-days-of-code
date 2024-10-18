import './VideoList.css'

export default function VideoList() {

    return(

        <div className="video-list">
            <div className="video-item">
                <iframe src="https://www.youtube.com/embed/Z3RAcq_goZI" frameborder="0" />
            
            </div>
            <div className="video-descriptionarea">
                <img 
                    src="https://via.placeholder.com/40x40.png?text=Logo" 
                    alt="" 
                    className="video-logo" 
                />
                <div>
                    <p className="video-title">Title</p>
                    <p className="video-description">Description</p>
                </div>
            </div>
        </div>
    )
}