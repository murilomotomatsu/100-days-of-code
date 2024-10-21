import VideoList from "../components/VideoList"
import FooterNav from "../components/FooterYt"
import { useState } from "react"
import VideoPlayer from "../components/VideoPlayer"

// Videos Page Trying to clone YT Layout
export default function Videos(){
    const [activeView, setActiveView] = useState('VideoList')

    return(
        <>
            {activeView === 'VideoList' ? <VideoList /> : <VideoPlayer />}
            <FooterNav onNavClick={setActiveView}/>
        </>
    )
}