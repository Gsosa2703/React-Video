import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/components/Header.scss'
import logo from  '../assets/static/logo-platzi-video-BW2.png'
import userIcon from '../assets/static/user-icon.png'
//Creamos componentes presentacionales, aquellos que no van a tener logica sino que solo empujan
//una construccion de html en nuestra aplicacion

const Header = () => (
    <header className="header">
        <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video"/>
        </Link>
       
        <div className="header__menu">
            <div className="header__menu--profile">
                <img src={userIcon} alt=""/>
                <p>Perfil</p>
            </div>
            <ul>
                <li>Cuenta</li>
                <li>
                    <Link to="/login">
                    Iniciar sesion
                    </Link>
                    </li>
            </ul>
        </div>
    </header>
)

export default Header