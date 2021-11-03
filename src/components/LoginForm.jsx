import React, {useState} from 'react' 

const Loginform = ({handleLogin, errorMessage}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <div className="container p-3 text-center">
          <div className="text-red">{(errorMessage !== "") && "wrong username or password" }</div>
             <form className="p-3" onSubmit={(e)=>{
                 e.preventDefault()
                 handleLogin({username, password})}}>
        <div className="p-2">
          Username 
            <input className="m-2"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="p-2">
          Password 
            <input className="m-2"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="mt-2" type="submit">login</button>
      </form>
        </div>
    );
}

export default Loginform;
