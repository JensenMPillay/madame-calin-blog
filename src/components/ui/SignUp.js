import React, { Fragment, useState, useContext} from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import Header from '../mainpage/Header';
import Footer from '../mainpage/Footer';


function SignUp(props) {

    // Import du Contexte Firebase

    const contextFirebase = useContext(FirebaseContext);

    const initialData = {
        username : '',
        email : '', 
        password : '',
        vpassword : '', 
        status : ''
    };

    const [loginData, setLoginData] = useState(initialData);

    const { username, email, password, vpassword, status } = loginData;

    const [error, setError] = useState('');

    const handleChange = (event) => {
        if (event.target.id === "daddy" || event.target.id === "mummy" || event.target.id === "visitor") {
            setLoginData({...loginData, status: event.target.id});
        }
        else {
        setLoginData({...loginData, [event.target.id]: event.target.value});
        }
    }

    // Fonction Submit qui fait appel à la fonction authUser pour enregistrer chaque user uid avec les éléments fournis dans le formulaire

    const handleSubmit = (event) => {
        event.preventDefault();
        contextFirebase.signUpUser(email, password)
            .then((authUser) => {
                return contextFirebase.userData(authUser.user.uid).set({
                    username: username, 
                    email: email,
                    password: password,
                    status: status
                });
            })

            // Log directement le user après inscription 

            .then(()=> {
                setLoginData({ ...initialData });
                contextFirebase.logInUser(email, password);
                props.history.push('/main');
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
                setLoginData({ ...initialData });
            })
    }

    // Vérification des éléments fournis

    const submit = username === '' || email === '' || password === '' || status === '' || password !== vpassword ? (<input type="submit" value="Valider" className="primary" disabled />) : (<input type="submit" value="Valider" className="primary" />);

    // Gestion Erreur 
    
    const errorMsg = error !== '' && <span id='inscrerror' onClick={()=>{setError("")}}>{error.message}</span>;


    return (
        <Fragment>

            <div id="wrapper">
                <Header title='Inscription' subtitle=':)' />

                {errorMsg}
                <form onSubmit={handleSubmit}>
                    <div className="row gtr-uniform">
                        <div className="col-3 col-12-xsmall">
                            <input type="text" name="username" id="username" value={username} placeholder="Pseudo" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="email" name="email" id="email" value={email} placeholder="Email" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="password" name="password" id="password" value={password} placeholder="Mot de Passe" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-3 col-12-xsmall">
                            <input type="password" name="vpassword" id="vpassword" value={vpassword} placeholder="Mot de Passe" autoComplete='on' onChange={handleChange} required/>
                        </div>
                        <div className="col-4 col-12-small">
                            <input type="radio" id="daddy" name={status} value='1' onChange={handleChange}/>
                            <label htmlFor="daddy">Papa</label>
                        </div>
                        <div className="col-4 col-12-small">
                            <input type="radio" id="mummy" name={status} value='2'onChange={handleChange}/>
                            <label htmlFor="mummy">Maman</label>
                        </div>
                        <div className="col-4 col-12-small">
                            <input type="radio" id="visitor" name={status} value='3' onChange={handleChange}/>
                            <label htmlFor="visitor">Visiteur</label>
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
                    <p>Déjà inscrit ? <Link to='/login'>Cliquez ici.</Link></p> 
                </div>


                <Footer />

            </div>

        </Fragment>
    )
}

export default SignUp;
