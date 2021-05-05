import React, { useState, useEffect } from 'react';

const Navbar = React.forwardRef(({ sectionList, navOffSetHeight }, ref) => {

    const [navOffSetTop, setNavOffSetTop] = useState(0) // Initialisation Position Navbar
    const [offSetSections, setOffSetSections] = useState([]) //Initialisation Position Sections

    const capitalize = (string) => {
        if (typeof string !== 'string') return '' // Vérification variable = chaîne de caractères
        return string.charAt(0).toUpperCase() + string.slice(1) // => 1ere lettre en Maj
    }

    useEffect(() => {
        const addAltClass = () => {

            if (window.scrollY >= navOffSetTop) { // Si le Scroll de la fenêtre > Position Navbar
                document.getElementById('nav').classList.add('alt') // Ajout de la Class 'alt'
            }
            else {
                document.getElementById('nav').classList.remove('alt') // Suppression de la Class 'alt'
            }
        }

        if (document.getElementById('body').contains(document.getElementById('nav'))) { // Vérification présence Navbar
            setNavOffSetTop(document.getElementById('nav').offsetTop);
            window.addEventListener("scroll", addAltClass);
        }

        return () => {
            window.removeEventListener("scroll", addAltClass);
        }
    }, [navOffSetTop])

    useEffect(() => {

        const sectionListFilter = sectionList.map((section) => {
            const sections = document.getElementsByTagName('section');
            const sectionData = sections[section.id];
            return (sectionData);
        }) // Récupèration sections
        setOffSetSections(() => sectionListFilter.map((section) => { // => un objet avec coordonnées pour chaque section de sectionList
            return ({
                id: section.id,
                posTop: section.offsetTop - navOffSetHeight,
                posBottom: section.offsetTop + section.offsetHeight - navOffSetHeight
            })
        }));

    }, [sectionList, navOffSetHeight])

    useEffect(() => {

        const buttons = document.getElementsByTagName('button');

        const buttonActiveOnScroll = () => {
            offSetSections.map((section) => {
                // Ajout/Suppression de la Class 'active' selon Scroll de la fenêtre / Position section
                if (window.scrollY >= section.posTop && window.scrollY < section.posBottom) {
                    buttons[section.id].classList.add('active');
                }
                else {
                    buttons[section.id].classList.remove('active');
                }
                return (null);
            })

        }

        if (document.getElementById('body').contains(document.getElementById('nav'))) { // Vérification présence Navbar
            window.addEventListener("scroll", buttonActiveOnScroll);
        }

        return () => {
            window.removeEventListener("scroll", buttonActiveOnScroll);
        }

    }, [offSetSections])

    return (
        <nav id="nav" ref={ref}>
            <ul className='menu-list'>
                {offSetSections.map((section, key) => {
                    return (
                        <li key={key}>
                            <button id={section.id} onClick={() => document.querySelector(`section#${section.id}`).scrollIntoView()}
                            >{capitalize(section.id)}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
});

export default Navbar;
