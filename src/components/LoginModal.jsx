import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';

const Loginmodal = ({show, close, handleLogin, user}) => {
    return (
        <Modal
        centered
        show={user==null && show}
        onHide={close}
        
        >
            <Modal.Header className="bg-dark text-white center" closeButton>
                <Modal.Title >Log In</Modal.Title>
            </Modal.Header>
             <Modal.Body className="bg-dark text-white p-3">
                <LoginForm handleLogin={handleLogin}/>         
            </Modal.Body>
        
      </Modal>

        
    );
}

export default Loginmodal;
