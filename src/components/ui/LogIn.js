import React, { Fragment, useState, useContext} from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import Header from '../mainpage/Header';
import Footer from '../mainpage/Footer';


function LogIn(props) {

    const contextFirebase = useContext(FirebaseContext);

    const initialData = {
        email : '', 
        password : ''
    }

    const [loginData, setLoginData] = useState(initialData);

    const {email, password } = loginData;

    const [error, setError] = useState('');

    const handleChange = (event) => {
        setLoginData({...loginData, [event.target.id]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        contextFirebase.logInUser(email, password)
            .then((user) => {
                setLoginData({ ...initialData });
                props.history.push('/main');
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
                setLoginData({ ...initialData });
            })
    }

    const submit = email === '' || password.length < 6 ? (<input type="submit" value="Valider" className="primary" disabled />) : (<input type="submit" value="Valider" className="primary" />);

    // Gestion Erreur 
    const errorMsg = error !== '' && <span id='inscrerror' onClick={()=>{setError("")}}>{error.message}</span>;


    return (
        <Fragment>

            <div id="wrapper">
                <Header title='Connexion' subtitle=';)' />

                {errorMsg}
                <form onSubmit={handleSubmit}>
                    <div className="row gtr-uniform">
                        <div className="col-6 col-12-xsmall">
                            <input type="email" name="email" id="email" value={email} placeholder="Email" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-6 col-12-xsmall">
                            <input type="password" name="password" id="password" value={password} placeholder="Mot de Passe" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-12">
                            <ul className="actions">
                                <li>{submit}</li>
                                <li><input type="reset" value="Réinitialiser" onClick={() => {setLoginData({...initialData})}}/></li>
                            </ul>
                        </div>
                    </div>
                </form>
                <div>
                    <p>Mot de passe oublié ? <Link to='/forgetpassword'>Cliquez ici.</Link></p> 
                    <p>Nouveau ? <Link to='/signup'>Inscrivez-vous ici.</Link></p> 
                </div>


                <Footer />

            </div>

        </Fragment>
    )
}

export default LogIn;

