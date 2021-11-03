import React from 'react';
import {Button} from 'react-bootstrap'

const SignupButton = ({openSignup}) => {

    const styles={
        button: {
            fontSize:"small",
            backgroundColor:"black", 
            padding:0,
            border: "none",
            textDecoration: "underline",

        }}
    
    
        return (
        <Button style={styles.button} variant="secondary" onClick={openSignup}>Sign-up</Button>
    );
}

export default SignupButton;