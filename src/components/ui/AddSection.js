import React, { Fragment, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Header from '../mainpage/Header';
import Footer from '../mainpage/Footer';

function AddSection() {

    // Import du Contexte

    const contextFirebase = useContext(FirebaseContext);

    // Initialisation des datas

    const initialData = {
        type: '',
        id: '',
        title: '',
        content: '',
        link: '',
        image: ''
    };

    const [sectionData, setSectionData] = useState(initialData);

    const { type, id, title, content, link, image } = sectionData;

    const [error, setError] = useState('');

    // A chaque changement de l'event, modifie la "data" correspondant selon la "value"
    const handleChange = (event) => {
        if (event.target.id === "introduction" || event.target.id === "presentation" || event.target.id === "statistics" || event.target.id === "learnmore") {
            setSectionData({ ...sectionData, type: event.target.id });
        }
        else {
            setSectionData({ ...sectionData, [event.target.id]: event.target.value });
        }
    }

    const handleSubmit = (event) => {

        // Au Submit, annule le rechargement de la page et enregistre les datas dans la base de données de Firebase

        event.preventDefault();
        return contextFirebase.contentData(sectionData.id).set({
            type: type,
            id: id,
            title: title,
            content: content,
            link: link,
            image: image
        })

            // Réinitialisation des données 

            .then(() => {
                setSectionData({ ...initialData });
                //props.history.push('/main');
            })

            // Gestion des erreurs

            .catch((error) => {
                setError(error);
                if (document.getElementById('body').contains(document.getElementById('inscrerror'))) {
                    document.getElementById('inscrerror').classList.remove('alt');
                    setTimeout(() => {
                        if (document.getElementById('body').contains(document.getElementById('inscrerror'))) {
                            document.getElementById('inscrerror').classList.add('alt');
                        }
                    }, 3000);
                }
                setSectionData({ ...initialData });
            })
    }

    // Selon le type, propose un formulaire différent

    const formType = (type) => {
        switch (type) {
            case 'introduction': {
                return (
                    <Fragment>
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="id" id="id" value={id} placeholder="Nom" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="title" id="title" value={title} placeholder="Titre" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <textarea name="content" id="content" value={content} placeholder="Tapez un texte" rows="6" autoComplete='on' onChange={handleChange} />
                        </div>
                        <div className="col-6 col-12-xsmall">
                            <input type="text" name="link" id="link" value={link} placeholder="Ajoutez un lien" autoComplete='on' onChange={handleChange} />
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="image" id="image" value={image} placeholder="Insérez une illustration" autoComplete='on' onChange={handleChange} />
                        </div>
                    </Fragment>
                )
            }
            case 'presentation': {
                return (
                    <Fragment>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="id" id="id" value={id} placeholder="Nom" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="title" id="title" value={title} placeholder="Titre" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="link" id="link" value={link} placeholder="Ajoutez un lien" autoComplete='on' onChange={handleChange} />
                        </div>
                    </Fragment>
                )
            }
            case 'statistics': {
                return (
                    <Fragment>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="id" id="id" value={id} placeholder="Nom" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="title" id="title" value={title} placeholder="Titre" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-4 col-12-xsmall">
                            <input type="text" name="link" id="link" value={link} placeholder="Ajoutez un lien" autoComplete='on' onChange={handleChange} />
                        </div>
                    </Fragment>
                )
            }
            case 'learnmore': {
                return (
                    <Fragment>
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="id" id="id" value={id} placeholder="Nom" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="title" id="title" value={title} placeholder="Titre" autoComplete='on' onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <textarea name="content" id="content" value={content} placeholder="Tapez un texte" rows="6" autoComplete='on' onChange={handleChange} />
                        </div>
                        <div className="col-6 col-12-xsmall">
                            <input type="text" name="link" id="link" value={link} placeholder="Ajoutez un lien" autoComplete='on' onChange={handleChange} />
                        </div>
                    </Fragment>
                )
            }
            default: {
                return null
            }
        }
    }

    const submit = type === '' ? (<input type="submit" value="Valider" className="primary" disabled />) : (<input type="submit" value="Valider" className="primary" />);

    // Gestion Erreur 
    const errorMsg = error !== '' && <span id='inscrerror' onClick={() => { setError("") }}>{error.message}</span>;


    return (
        <Fragment>

            <div id="wrapper">
                <Header title='Gestion de Contenu' subtitle=':P' />

                {errorMsg}
                <form onSubmit={handleSubmit}>
                    <div className="row gtr-uniform">

                        <div className="col-3 col-12-small">
                            <input type="radio" id="introduction" name={type} value='introduction' onChange={handleChange} />
                            <label htmlFor="introduction">Introduction</label>
                        </div>
                        <div className="col-3 col-12-small">
                            <input type="radio" id="presentation" name={type} value='presentation' onChange={handleChange} />
                            <label htmlFor="presentation">Presentation</label>
                        </div>
                        <div className="col-3 col-12-small">
                            <input type="radio" id="statistics" name={type} value='statistics' onChange={handleChange} />
                            <label htmlFor="statistics">Statistiques</label>
                        </div>
                        <div className="col-3 col-12-small">
                            <input type="radio" id="learnmore" name={type} value='learnmore' onChange={handleChange} />
                            <label htmlFor="learnmore">En Savoir Plus</label>
                        </div>

                        {formType(type)}

                        <div className="col-12">
                            <ul className="actions">
                                <li>{submit}</li>
                                <li><input type="reset" value="Réinitialiser" onClick={() => { setSectionData({ ...sectionData }) }} /></li>
                            </ul>
                        </div>
                    </div>
                </form>

                <Footer />

            </div>

        </Fragment>
    )
}

export default AddSection;
