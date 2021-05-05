import React from 'react';
import { Link } from 'react-router-dom';

const Footer = React.forwardRef((props, ref) => {
    return (
        <footer id="footer" ref={ref}>
            <section>
                <h2>Madame Câlin</h2>
                <p>En Formation</p>
                <ul className="actions">
                    <li><Link className="button" to="/pagetemplate">En Savoir Plus</Link></li>
                </ul>
            </section>
            <section>
                <h2>Contact</h2>
                <dl className="alt">
                    <dt>Téléphone</dt>
                    <dd>06 00 00 00 00</dd>
                    <dt>Email</dt>
                    <dd><Link to="/">MadameCâlin@gmail.com</Link></dd>
                </dl>
                <ul className="icons">
                    <li><Link to="/" className="icon brands fa-twitter alt"><span className="label">Twitter</span></Link></li>
                    <li><Link to="/" className="icon brands fa-facebook-f alt"><span className="label">Facebook</span></Link></li>
                    <li><Link to="/" className="icon brands fa-instagram alt"><span className="label">Instagram</span></Link></li>
                    <li><Link to="/" className="icon brands fa-github alt"><span className="label">GitHub</span></Link></li>
                </ul>
            </section>
            <p className="copyright">&copy; Jensen MOOROONGAPILLAY </p>
        </footer>
    )
})

export default Footer;
