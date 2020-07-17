import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import gravatar from '../utils/gravatar';
import {logoutRequest} from '../actions_';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import '../assets/styles/components/Header.scss'
import logo from '../assets/static/logo-platzi-video-BW2.png'
import userIcon from '../assets/static/user-icon.png'
//Creamos componentes presentacionales, aquellos que no van a tener logica sino que solo empujan
//una construccion de html en nuestra aplicacion

const Header = (props) => {
const {user, isLogin, isRegister} = props;
const hasUser = Object.keys(user).length > 0;

const handleLogout = () => {
    props.logoutRequest({})
}
const headerClass = classNames('header', {
    isLogin, 
    isRegister
})

return (
<header className={headerClass}>
    <Link to="/">
    <img className="header__img" src={logo} alt="Platzi Video" />
    </Link>

    <div className="header__menu">
        <div className="header__menu--profile">
            { hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={userIcon} alt="" />
            }
            <p>Perfil</p>
        </div>
        <ul>
            {
            hasUser ?
            <li>{user.name}</li>
            : null
            }
            {
            hasUser ?
            <li>
                <a href="#logout" onClick={handleLogout}>
                    Cerrar Sesion
                </a>
            </li>
            :
            <li>
                <Link to="/login">
                Iniciar sesion
                </Link>
            </li>

            }

        </ul>
    </div>
</header>
)}

const mapStateToProps = state => {
return {
user: state.user

    }
}
const mapDispatchToProps = {
logoutRequest,
}

Header.propTypes ={
    user: PropTypes.object,

    logoutRequest: PropTypes.func,

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)