import React, {useState, useEffect} from 'react';
import PasswordStrengthBar from 'react-password-strength-bar'

const SignupForm = ({handleSignup}) => {
    const [formValid, setFormValid] = useState(false)   

    const [username, setUsername] = useState("")    
    const [usernameValid, setUsernameValid] = useState(true)
    const displayFeedback = usernameValid ? { display: "none"} : {display: ""}        
    const usernameValidator = () => {        
        if (username.length < 4 || username.length > 63){
            setUsernameValid(false)
        } else if (username.length > 3 || username.length < 64){
            setUsernameValid(true)
        }        
    }        
    
    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(true) 
    const [hasEight, setHasEight] = useState(true)
    const [hasCaps, setHasCaps] = useState(true)
    const [hasDigit, setHasDigit] = useState(true)
    const [hasSpec, setHasSpec] = useState(true)    
    const passswordrequirements = [
        ["must have at least 8 characters", hasEight],
        ["must have at least 1 caps", hasCaps],
        ["must have at least 1 digit", hasDigit],
        ["must have at least 1 special", hasSpec]
    ]
    const passwordValidator = () => {
        
        if (password.length < 8) setHasEight(false)
        else setHasEight(true)
        if (password.toLowerCase() !== password) setHasCaps(true)
        else setHasCaps(false)
        if (/\d/.test(password)) setHasDigit(true)
        else setHasDigit(false)
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) setHasSpec(true)
        else setHasSpec(false)
        if (hasEight && hasCaps && hasDigit && hasSpec) setPasswordValid(true)
        else setPasswordValid(false)
    }

    const [email, setEmail] = useState("")    
    const [emailValid, setEmailValid] = useState(true)
    const emailValidator = () => {    
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        emailRegex.test(email) ?  setEmailValid(true) : setEmailValid(false) 
    }

    const handleFormChange = (e) => {
        if(passwordValid){
            setFormValid(true)
        }else{
            setFormValid(false)
        }        
    }
        
    useEffect(() => {
        if (usernameValid && emailValid && passwordValid) setFormValid(true)
        else setFormValid(false)        
    }, [usernameValid, emailValid, passwordValid, formValid] );
        
    return (                  
        <div className="container p-3 text-center">
             <form className="p-3" onSubmit={(e)=>{
                e.preventDefault()
                handleSignup({username, email, password})}}
                onKeyUp={(e)=>handleFormChange(e)}>                  
                <div className="p-2">
                    <label htmlFor="username">Please enter a username
                    </label>
                    <input 
                        id="username"
                        className="m-2"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyUp={usernameValidator}                        
                    />
                    <ul className="inputFeedback">
                        <li style={displayFeedback}>length should be between 4 and 64</li>
                    </ul>
                </div>

                <div className="p-2">
                    <label htmlFor="email">Please enter a valid email
                    </label> 
                    <input 
                        id="email"
                        className="m-2"
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={emailValidator}
                    />
                </div>
            
                <div className="p-2">
                    <label htmlFor="password">Please enter a password                               
                    </label> 
                    <input 
                        id="password"
                        className="m-2 mb-3"
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={passwordValidator}
                    />
                    <ul>
                        {
                         passswordrequirements.map(e => <li className="inputFeedback" style={e[1] ? {display:"none"} : {display:""} }>{e[0]}</li>)
                        }
                    </ul>
                    <PasswordStrengthBar password={password} />
                </div>
                <button disabled={formValid ? false : true} className="mt-2" type="submit">Sign Up</button>
            </form>
        </div>       
    );
}        

export default SignupForm;
