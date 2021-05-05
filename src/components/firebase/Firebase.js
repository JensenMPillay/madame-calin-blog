import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAyAspanAJ1BC7ONX3H1cLV-8k8LEU2P4Y",
    authDomain: "madame-calin.firebaseapp.com",
    projectId: "madame-calin",
    storageBucket: "madame-calin.appspot.com",
    messagingSenderId: "1055047972171",
    appId: "1:1055047972171:web:7e7baa42e257af561da4ce"
};


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Inscription
    signUpUser = (mail, password) => {
        return (
            this.auth.createUserWithEmailAndPassword(mail, password));
    }

    // Connexion
    logInUser = (mail, password) => {
        return (
            this.auth.signInWithEmailAndPassword(mail, password));
    }

    // Deconnexion
    disconnectUser = () => {
        return (
            this.auth.signOut());
    }

    // Récupération Mot de passe
    passwordReset = (mail) => {
        return (
            this.auth.sendPasswordResetEmail(mail));
    }

    // Gestion Données Utilisateur
    userData = (userId) => {
        return (
            this.db.doc(`users/${userId}`))
    }

    //Gestion Sections Blog
    contentData = (contentSection) => {
        return (
            this.db.doc(`sections/${contentSection}`))
    }

    //Gestion Affichage Sections > Main
    allSectionData = () => {
        return (
            this.db.collection(`sections`))
    }

}

export default Firebase;