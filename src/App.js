import './App.css';
import React, { useState } from 'react'
import {Details, Results, Footer, LoadingSpinner, NavBar, Search, LoginModal, SignupModal} from './components/index'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import loginService from './services/login'

const App = () => {   
 
  const [errorMessage, setErrorMessage] = useState("")  
  const [dishes, setDishes] = useState([])
  const [details, setDetails] = useState({})
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleSignupShow = () => setShowSignup(true);
  const handleSignupClose = () => setShowSignup(false)
 
  const getDetail = async id => {    
    setLoading(true)
    const queryString = `http://localhost:3001/api/dishes/${id}`
    axios.get(queryString).then(response => {
      setLoading(false)
      setDetails(response.data)
      handleShow()
    })
  }
  const logout = () => {
    console.log("login out")
    setUser(null)
  }

  const signup = credentials => {
    console.log("signin up with credentials : ", credentials.email, credentials.password)
    axios.post('http://localhost:3001/api/signup', credentials).then(response => {
      console.log(response.data)
      handleSignupClose() 
    })
  }

  const login = async credentials => {
    try{
      const user = await loginService.login(credentials)
      console.log(user)
      setUser(user)
    }
    catch (exception){
      setErrorMessage("wrong credentials")
      setTimeout(()=>{setErrorMessage(null)}, 5000)
    }

  }

  const getDishes = (dishes) => {
    setDishes(dishes)
  }

  const addToDishes = (details) => {
    const username = user.username
    axios.post('http://localhost:3001/api/dishes/add', {username, details}).then(response => {
      console.log(response)
    })

  }

  return (
      <div className="bg-dark ">
        <NavBar 
          user={user} 
          //login={login} 
          logout={logout} 
          openLoginModal={handleLoginShow}
          openSignupModal={handleSignupShow}/>

        <LoadingSpinner visibility={loading}/>
        
        <Search getDishes={getDishes}/>

        <Results dishes={dishes} getDetail={getDetail} />
        
        <Details 
          details={details}
          show={show}
          close={handleClose}              
          user={user}
          addToDishes={addToDishes}              
          />
        <LoginModal 
          show={showLogin}
          close={handleLoginClose}
          handleLogin={login}
          user={user}
          errorMessage={errorMessage}
          />
        <SignupModal 
          show={showSignup}
          close={handleSignupClose}
          handleSignup={signup}
          user={user}
        />
        <Footer />
      </div>
    );
}

export default App;
