import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


function HomePage() {

        /* Retire la classe du préchargement pour afficher l'header à la construction de la page */

        useEffect(() => {
            document.getElementsByTagName('body').body.classList.remove('is-preload'); 
            return () => {
                document.getElementsByTagName('body').body.classList.add('is-preload'); 
            }
        },[])
    

    return (
        <Fragment>
            <div id="wrapper" className='homepage'>
                <Header title='Miss Câlin'></Header>
                <div className='signup'>
                    <Link to='/signup' className="button small">Inscription</Link>
                </div>
                <div className='login'>
                <Link to='/login' className="button primary small">Connexion</Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default HomePage;
