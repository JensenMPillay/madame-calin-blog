import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
  <React.StrictMode>

    {/* Création d'un contexte Firebase pour l'utilisation dans l'App */}

    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

