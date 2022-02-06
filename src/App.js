import './App.css';
import React, { useState } from 'react'
import {Details, Results, Footer, LoadingSpinner, NavBar, Search, LoginModal, SignupModal} from './components/index'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {   
 
  const [errorMessage, setErrorMessage] = useState("")  
  const [dishes, setDishes] = useState([])
  const [details, setDetails] = useState({})
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const getDetail = async id => {    
    setLoading(true)
    const queryString = `http://localhost:3001/api/dishes/${id}`
    axios.get(queryString).then(response => {
      setLoading(false)
      setDetails(response.data)
      handleShow()
    })
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
          />

        <LoadingSpinner visibility={loading}/>
        
        <Search getDishes={getDishes}/>

        <Results dishes={dishes} getDetail={getDetail} />
        
        <Details 
          details={details}
          show={show}
          close={handleClose}              
          addToDishes={addToDishes}              
          />
        
        <Footer />
      </div>
    );
}

export default App;
