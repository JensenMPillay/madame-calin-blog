import React, { Fragment, useState, useContext} from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import Header from '../mainpage/Header';
import Footer from '../mainpage/Footer';

function ForgetPassword(props) {

    const contextFirebase = useContext(FirebaseContext);

    const [loginData, setLoginData] = useState('')

    const [success, setSuccess] = useState(false)

    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        contextFirebase.passwordReset(loginData)
            .then((user) => {
                setSuccess(loginData);
                setLoginData('');
                setTimeout(() => {
                    return <Redirect to='/login' />
                }, 5000);
            })
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
                setLoginData('');
            });
    }

    const submit = loginData === '' ? (<input type="submit" value="Valider" className="primary" disabled />) : (<input type="submit" value="Valider" className="primary" />)

    //Gestion de Succés

    const successMsg = success && <span id='successmsg' onClick={()=>{document.getElementById('successmsg').classList.add('alt');}} >`Veuillez accéder à l'adresse {success} pour réinitialiser votre mot de passe`.</span>;

    // Gestion Erreur 

    const errorMsg = error !== '' && <span id='inscrerror' onClick={()=>{document.getElementById('inscrerror').classList.add('alt');}} >{error.message}</span>;

    return (
        <Fragment>

            <div id="wrapper">
                <Header title='Connexion' subtitle='Mot de passe oublié ?' />

                {successMsg}
                {errorMsg}

                <form onSubmit={handleSubmit}>
                    <div id="forgetform"  className="row gtr-uniform">
                        <div className="col-6 col-12-xsmall">
                            <input type="email" name="email" id="loginData" value={loginData} placeholder="Email" autoComplete='on' onChange={(event) => {setLoginData(event.target.value)}} required/>
                        </div>
                        <div className="col-12">
                            <ul className="actions">
                                <li>{submit}</li>
                                <li><input type="reset" value="Réinitialiser" onClick={() => {setLoginData('')}}/></li>
                            </ul>
                        </div>
                    </div>
                </form>
                <div>
                    <p>Mail reçu ? <Link to='/login'>Cliquez ici.</Link></p> 
                    <p>Mail oublié ? <Link to='/signup'>Incrivez-vous ici.</Link></p> 
                </div>

                <Footer />

            </div>

        </Fragment>
    )
}

export default ForgetPassword;
