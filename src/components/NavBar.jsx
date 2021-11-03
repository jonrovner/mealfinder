import React from 'react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton'


const NavBar = ({user, openLoginModal, openSignupModal, logout}) => {
    return (
        <div className="navBar navbar navbar-expand-sm navbar-dark px-sm-3 d-flex justify-content-between align-items-center">
            <h1>🍽</h1>
                     
           {user!==null 
           ? <div className="text-white">hello {user.username} <span className="text-white text-large" onClick={logout} >⇨</span></div> 
           : <div className="d-flex flex-column">
                 <LoginButton openLogin={openLoginModal}/>
                 <SignupButton openSignup={openSignupModal}/>
            </div>}
        </div>
    );
}

export default NavBar;
