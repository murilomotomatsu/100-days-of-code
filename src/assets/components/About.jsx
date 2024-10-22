import './About.css'
import Perfil from '../images/perfil.png'
import Portfolio from '../images/vectorCurriculum.svg'
import GitHub from '../images/vectorGitHub.svg'
import Linkedin from '../images/vectorLinkedin.svg'

//About-me component for global usage
export default function AboutComponent() {

    return (
        <div className="about-me">
            <div>
                <h1>Murilo Motomatsu, navigating into the unknown.</h1>
                <p>I’m committed to gaining as much knowledge as I can aiming for achievements that will truly test me during this 100-day journey.</p>
                <p>Join me on this route, and if you're curious to know more, feel free to explore my portfolio for all the info.</p>
                <div className="socials">
                    <a href="https://murilomotomatsu.github.io/MuriloPortfolio/" target='_blank'><img src={Portfolio} alt="" /></a>
                    <a href="https://www.linkedin.com/in/murilo-motomatsu-88077826a/" target='_blank'><img src={Linkedin} alt="" /></a>
                    <a href="https://github.com/murilomotomatsu" target='_blank'><img src={GitHub} alt="" /></a>
                </div>


            </div>
            <div>
                <img
                    src={Perfil}
                    alt=""
                />
            </div>



        </div>
    )
}