import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>tMovies</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Contact us</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Term of services</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Live</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>FAQ</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Premium</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Privacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>You must watch</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Recent release</Link>
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
