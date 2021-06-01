import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

const Section = React.forwardRef(({ admin, type, id, title, content, link, image }, ref) => {

    // Import du Contexte

    const contextFirebase = useContext(FirebaseContext);

    const capitalize = (string) => {

        // Vérification variable = chaîne de caractères

        if (typeof string !== 'string') return '' 

        // => 1ere lettre en Maj

        return string.charAt(0).toUpperCase() + string.slice(1) 
    }

    // Fonction de suppression de la section 'id'

    const handleDelSection = (id) => {
        contextFirebase.contentData(id)
            .delete()
            .catch((error) => {
                console.log(error)
            })
        document.querySelector(`section#${id}>footer>button.delsectionbtn`).classList.add('success');
        document.querySelector(`section#${id}>footer>button.delsectionbtn`).innerHTML='Supprimée !';
        
    }

    // Affichage section selon le 'type'

    switch (type) {
        case 'introduction':
            return (
                <section id={id} ref={ref} className="main">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>{capitalize(title)}</h2>
                            </header>
                            <p>{content}</p>
                            <ul className="actions">
                                <li><Link className="button" to={link ? (link) : (`/`)}>En Savoir Plus</Link></li>
                            </ul>
                        </div>
                        <span className="image"><img src={image} alt="" /></span>
                    </div>
                    {admin && <button className="button small delsectionbtn" onClick={() => handleDelSection(id)}>Supprimer</button>}
                </section>
            );

        case 'presentation':
            return (
                <section id={id} ref={ref} className="main special">
                    <header className="major">
                        <h2>{capitalize(title)}</h2>
                    </header>
                    <ul className="features">
                        <li>
                            <span className="icon solid major style1 fa-code"></span>
                            <h3>Ipsum consequat</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                        <li>
                            <span className="icon major style3 fa-copy"></span>
                            <h3>Amed sed feugiat</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                        <li>
                            <span className="icon major style5 fa-gem"></span>
                            <h3>Dolor nullam</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                    </ul>
                    <footer className="major">
                        <ul className="actions special">
                            <li><Link className="button" to="/pagetemplate">En Savoir Plus</Link></li>
                        </ul>
                        {admin && <button className="button small delsectionbtn" onClick={() => handleDelSection(id)}>Supprimer</button>}
                    </footer>
                </section>
            );

        case 'statistics':
            return (
                <section id={id} ref={ref} className="main special">
                    <header className="major">
                        <h2>{capitalize(title)}</h2>
                        <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
                        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                    </header>
                    <ul className="statistics">
                        <li className="style1">
                            <span className="icon solid fa-code-branch"></span>
                            <strong>5,120</strong> Etiam
                        </li>
                        <li className="style2">
                            <span className="icon fa-folder-open"></span>
                            <strong>8,192</strong> Magna
                        </li>
                        <li className="style3">
                            <span className="icon solid fa-signal"></span>
                            <strong>2,048</strong> Tempus
                        </li>
                        <li className="style4">
                            <span className="icon solid fa-laptop"></span>
                            <strong>4,096</strong> Aliquam
                        </li>
                        <li className="style5">
                            <span className="icon fa-gem"></span>
                            <strong>1,024</strong> Nullam
                        </li>
                    </ul>
                    <p className="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
                    <footer className="major">
                        <ul className="actions special">
                            <li><Link className="button" to="/pagetemplate">En Savoir Plus</Link></li>
                        </ul>
                        {admin && <button className="button small delsectionbtn" onClick={() => handleDelSection(id)}>Supprimer</button>}
                    </footer>
                </section>
            );

        case 'learnmore':
            return (
                <section id={id} ref={ref} className="main special">
                    <header className="major">
                        <h2>{capitalize(title)}</h2>
                        <p>{content}</p>
                    </header>
                    <footer className="major">
                        <ul className="actions special">
                            <li><Link to={link ? (link) : (`/`)} className="button">En Savoir Plus</Link></li>
                        </ul>
                        {admin && <button className="button small delsectionbtn" onClick={() => handleDelSection(id)}>Supprimer</button>}
                    </footer>
                </section>
            );

        default:
            return null;
    }
})

export default Section;