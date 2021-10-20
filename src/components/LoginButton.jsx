import React from 'react';
import {Button} from 'react-bootstrap'

const Loginbutton = ({openLogin}) => {
    return (
        <Button variant="secondary" onClick={openLogin}>Log in</Button>
    );
}

export default Loginbutton;
