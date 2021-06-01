import React, { useState, useEffect } from 'react';

const Navbar = React.forwardRef(({ sectionList, navOffSetHeight }, ref) => {

    // Initialisation Position Navbar

    const [navOffSetTop, setNavOffSetTop] = useState(0) 

    //Initialisation Position Sections

    const [offSetSections, setOffSetSections] = useState([]) 

    const capitalize = (string) => {

        // Vérification variable = chaîne de caractères

        if (typeof string !== 'string') return '' 

        // => 1ere lettre en Maj

        return string.charAt(0).toUpperCase() + string.slice(1) 
    }

    useEffect(() => {
        const addAltClass = () => {

            // Si le Scroll de la fenêtre > Position Navbar

            if (window.scrollY >= navOffSetTop) { 

                // Ajout de la Class 'alt'

                document.getElementById('nav').classList.add('alt') 
            }
            else {

                // Suppression de la Class 'alt'

                document.getElementById('nav').classList.remove('alt') 
            }
        }

        // Vérification présence Navbar

        if (document.getElementById('body').contains(document.getElementById('nav'))) { 
            setNavOffSetTop(document.getElementById('nav').offsetTop);
            window.addEventListener("scroll", addAltClass);
        }

        return () => {
            window.removeEventListener("scroll", addAltClass);
        }
    }, [navOffSetTop])

    useEffect(() => {

        // Récupération des sectiopns

        const sectionListFilter = sectionList.map((section) => {
            const sections = document.getElementsByTagName('section');
            const sectionData = sections[section.id];
            return (sectionData);
        })

        // => un objet avec coordonnées pour chaque section de sectionList

        setOffSetSections(() => sectionListFilter.map((section) => { 
            return ({
                id: section.id,
                posTop: section.offsetTop - navOffSetHeight,
                posBottom: section.offsetTop + section.offsetHeight - navOffSetHeight
            })
        }));

    }, [sectionList, navOffSetHeight])

    useEffect(() => {

        const buttons = document.getElementsByTagName('button');

        // Ajout/Suppression de la Class 'active' selon Scroll de la fenêtre / Position section

        const buttonActiveOnScroll = () => {
            offSetSections.map((section) => {
                if (window.scrollY >= section.posTop && window.scrollY < section.posBottom) {
                    buttons[section.id].classList.add('active');
                }
                else {
                    buttons[section.id].classList.remove('active');
                }
                return (null);
            })

        }

        // Vérification présence Navbar

        if (document.getElementById('body').contains(document.getElementById('nav'))) { 
            window.addEventListener("scroll", buttonActiveOnScroll);
        }

        return () => {
            window.removeEventListener("scroll", buttonActiveOnScroll);
        }

    }, [offSetSections])

    return (
        <nav id="nav" ref={ref}>
            <ul className='menu-list'>

                {/* Création d'un bouton dynamique pour chaque section de offSetSections  */}

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
