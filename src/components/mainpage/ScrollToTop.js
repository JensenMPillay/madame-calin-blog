import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
  useEffect(() => {

    //Remettre l'écran à la position initial et ajout de la classe is-preload

    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      document.getElementsByTagName('body').body.classList.add('is-preload');
    });

    // Retire la classe au montage de l'élément

    document.getElementsByTagName('body').body.classList.remove('is-preload');

    // Renvoie la fonction crée au démontage de l'élément
    
    return () => {
      unlisten();
    }
  }, [history]);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);