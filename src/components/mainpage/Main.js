import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import Header from './Header';
import Navbar from './Navbar';
import Section from './Section';
import Footer from './Footer';


function Main(props) {

    const contextFirebase = useContext(FirebaseContext);

    const navbarRef = useRef(null);

    const sectionRef = useRef(null);

    const footerRef = useRef(null);

    const [sectionList, setSectionList] = useState([])
    const [navOffSetHeight, setNavOffSetHeight] = useState(0) // Initialisation Position Navbar

    useEffect(() => {
        contextFirebase.allSectionData()
            .get()
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

        if (footerRef.current !== null) {
            setNavOffSetHeight(document.getElementById('nav').offsetHeight);
            const removeNavBar = () => {

                if (window.scrollY >= (footerRef.current.offsetTop - navOffSetHeight)) { // Si le Scroll de la fenêtre > Position Footer
                    navbarRef.current.style.display = "none";
                }
                else if (window.scrollY < (footerRef.current.offsetTop - navOffSetHeight)) { // Si le Scroll de la fenêtre < Position Footer
                    navbarRef.current.style.display = "initial";
                }
            };

            if (document.getElementById('body').contains(document.getElementById('nav'))) { // Vérification présence Navbar
                window.addEventListener("scroll", removeNavBar);
            };

            return () => {
                window.removeEventListener("scroll", removeNavBar);
            };
        };
    }, [navOffSetHeight])

    const admin = (props.userData.status === 'daddy' || props.userData.status === 'mummy')

    return (
        <Fragment>

            <div id="wrapper">

                <LogOut />

                <Header title='Miss Câlin' subtitle='Mes Péripéties avec mes parents et Léon...' />

                <Navbar ref={navbarRef} sectionList={sectionList} navOffSetHeight={navOffSetHeight} />

                <div id="main">

                    {sectionList.map((section) => {
                        const { type, id, title, content, link, image } = section;
                        return (
                            <Section admin={admin} ref={sectionRef} type={type} key={id} id={id} title={title} content={content} link={link} image={image} />
                        )
                    })}

                </div>

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
