import React, { useState, useEffect, useContext }from 'react'
import { FirebaseContext } from '../firebase';
import  { Redirect } from 'react-router-dom'

function LogOut() {

    const contextFirebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

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
