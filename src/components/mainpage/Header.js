import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg'

function Header(props) {

    const HandleMouse = (bool) => {
        bool ? document.getElementById('fusee').classList.add('alt') : document.getElementById('fusee').classList.remove('alt');
    }

    /* Retire la classe du préchargement pour afficher l'header à la construction de la page */

    useEffect(() => {
            document.getElementsByTagName('body').body.classList.remove('is-preload');
        return () => {
            document.getElementsByTagName('body').body.classList.add('is-preload'); 
        }
    },[props])



    return (
        <header id="header" key={props.title} className="alt">
            <Link to="/main"><span className="logo"><img id="fusee" src={Logo} alt="" onClick={()=> {document.getElementsByTagName('body').body.classList.add('is-preload')}} onMouseOver={() => HandleMouse(true)} onMouseLeave={() => HandleMouse(false)} /></span></Link>
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
        </header>
        
    )
}

export default Header;
