import React from 'react';
import LoginButton from './LoginButton';


const NavBar = ({user, openLoginModal}) => {
    return (
        <div className="navBar navbar navbar-expand-sm navbar-dark px-sm-5 d-flex justify-content-between">
            <img src="food_log.svg" alt="" style={{width: 24}} />
         
           {user!==null ? <div className="text-white">hello {user.username}</div> : <LoginButton openLogin={openLoginModal}/> }
        </div>
    );
}

export default NavBar;
