import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import Header from './Header';
import Navbar from './Navbar';
import Section from './Section';
import Footer from './Footer';


function Main(props) {

    // Import du Contexte

    const contextFirebase = useContext(FirebaseContext);

    // Initialisation des Références des éléments

    const navbarRef = useRef(null);

    const sectionRef = useRef(null);

    const footerRef = useRef(null);

    // Initiatlisation de la liste des sections

    const [sectionList, setSectionList] = useState([])

    // Initialisation Position Navbar
    
    const [navOffSetHeight, setNavOffSetHeight] = useState(0) 

    // Récupération des sections via Firebase

    useEffect(() => {
        contextFirebase.allSectionData()
            .get()

            // Pour chaque section récupérée via Firebase, l'ajoute à la liste des sections

            .then((allSectionData) => {
                allSectionData.forEach(section => {
                    const sectionData = section.data();
                    setSectionList((sectionList) => [...sectionList, sectionData]);
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }, [contextFirebase])

    useEffect(() => {

        // Initialisation de la position de la Navbar

        if (footerRef.current !== null) {
            setNavOffSetHeight(document.getElementById('nav').offsetHeight);
            const removeNavBar = () => {

                // Si le Scroll de la fenêtre > Position Footer

                if (window.scrollY >= (footerRef.current.offsetTop - navOffSetHeight)) { 
                    navbarRef.current.style.display = "none";
                }

                // Si le Scroll de la fenêtre < Position Footer

                else if (window.scrollY < (footerRef.current.offsetTop - navOffSetHeight)) { 
                    navbarRef.current.style.display = "initial";
                }
            };

            // Vérification présence Navbar et écoute "scroll" pour la fonction removeNavbar

            if (document.getElementById('body').contains(document.getElementById('nav'))) { 
                window.addEventListener("scroll", removeNavBar);
            };

            // Désactive l'écoute à la décomposition du composant

            return () => {
                window.removeEventListener("scroll", removeNavBar);
            };
        };
    }, [navOffSetHeight])

    // Vérification du statut "admin" via la donnée Firebase


    const admin = (props.userData.status === 'daddy' || props.userData.status === 'mummy')

    return (
        <Fragment>

            <div id="wrapper">

                <LogOut />

                <Header title='Miss Câlin' subtitle='Mes Péripéties avec mes parents et Léon...' />

                <Navbar ref={navbarRef} sectionList={sectionList} navOffSetHeight={navOffSetHeight} />

                <div id="main">

                    {/* Pour chaque section de la liste des sections, renvoie une section avec les éléments de la base de données */}

                    {sectionList.map((section) => {
                        const { type, id, title, content, link, image } = section;
                        return (
                            <Section admin={admin} ref={sectionRef} type={type} key={id} id={id} title={title} content={content} link={link} image={image} />
                        )
                    })}

                </div>

                {/* Selon statut "admin", ajout d'une section "addsection" */}

                {admin &&
                    <section id='+'>
                        <Link id='addsectionbtn' to='/addsection' className="button primary small">+ de Contenu</Link>
                    </section>}

                <Footer ref={footerRef} />

            </div>

        </Fragment>

    )
}

export default Main;
