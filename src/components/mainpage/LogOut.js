import React, { useState, useEffect, useContext }from 'react'
import { FirebaseContext } from '../firebase';
import  { Redirect } from 'react-router-dom'

function LogOut() {

    // Import du Contexte

    const contextFirebase = useContext(FirebaseContext);

    // State du Check

    const [checked, setChecked] = useState(false);

    // Fonction changeant l'état

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    // Deconnexion lorsque du Click et Redirection à :/

    useEffect(() => {
        if (checked) {
            setTimeout(() => {
                contextFirebase.disconnectUser()
                .then(() => {
                    return <Redirect to='/' />
                });
            }, 1000);
            
        }
    }, [checked, contextFirebase]);
    
    return (
        <div id="logout">
            <label className="switch" htmlFor="checkbox">
                <input type="checkbox" id="checkbox" checked={checked} onChange={handleChange}/>
                <div className="slider round"></div>
            </label>
        </div>
    )
}

export default LogOut;
