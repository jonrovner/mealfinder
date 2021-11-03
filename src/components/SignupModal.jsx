import React from 'react';
import { Modal } from 'react-bootstrap';
import SignupForm from './SignupForm';

const SignupModal = ({show, close, handleSignup, user}) => {
    return (
        <Modal
        centered
        show={user==null && show}
        onHide={close}        
        >
            <Modal.Header className="bg-dark text-white center" closeButton>
                <Modal.Title >Sign Up</Modal.Title>
            </Modal.Header>
             <Modal.Body className="bg-dark text-white p-3">
                <SignupForm handleSignup={handleSignup}/>         
            </Modal.Body>
        
      </Modal>

        
    );
}

export default SignupModal;