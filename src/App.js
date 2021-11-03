import './App.css';
import React, { useState } from 'react'
import {Details, Results, Favs, Footer, LoadingSpinner, NavBar, PantryList, Search, LoginModal, SignupModal} from './components/index'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => { 
  
  const  useStickyState = (defaultValue, key) => {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }
  const [errorMessage, setErrorMessage] = useState("")
  
  const [pantryList, setPantryList] = useStickyState([], "pantryList")
  const [favs, setFavs] = useStickyState([], "favs")
  
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

  
  const getDetail = async (id) => {    
    setLoading(true)
    const queryString = `http://localhost:3001/api/dishes/${id}`
    axios.get(queryString).then(response => {
      setLoading(false)
      setDetails(response.data)
      handleShow()
    })
  }
  
  const addToPantry = name => {
    setPantryList(pantryList.concat(...name))
  }

  const removeFromPantry = name => {
   setPantryList(pantryList.filter(e => e!==name))
  }

  const addToFavs = id => {
    const existingDish = favs.find(e => e.title === id.title)
    if (existingDish){return alert("already in list")}
    const set = new Set(favs.concat(id))
    setFavs([...set])
    favs.forEach(fav => console.log(fav.title))

  }

  const removeFromFavs = item => {
    setFavs(favs.filter(fav => fav.title !== item.title))
  }

  const handleDetails = detailObject => {
    setDetails(detailObject)
    handleShow()
  }

  const login = credentials => {
    console.log("login in with : ", credentials.username, credentials.password  )
    
    axios.post('http://localhost:3001/api/login', credentials).then(response => {
      console.log("server responded : ", response.data)
      setUser(response.data)
    }).catch(error => {
      console.log("server responded: ", error)
      console.log(error)
      setErrorMessage(error.data)
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

  const getDishes = (dishes) => {
    setDishes(dishes)
  }

  return (
      <div className="bg-dark ">
        <NavBar 
          user={user} 
          login={login} 
          logout={logout} 
          openLoginModal={handleLoginShow}
          openSignupModal={handleSignupShow}/>
        <LoadingSpinner visibility={loading}/>
        
        <Search getDishes={getDishes}/>
        


        <div className="container p-3 d-flex flex-column ">
          <div className="row text-white p-2 border border-white">
            <PantryList 
              list={pantryList} 
              addToLIst={addToPantry} 
              removeFromList={removeFromPantry}/>

            <Results dishes={dishes} getDetail={getDetail} />
            
            <Favs 
              favList={favs} 
              handleDetails={handleDetails} 
              remove={removeFromFavs} 
              user={user}/>

            <Details 
              details={details}
              show={show}
              close={handleClose}
              addToFavs={addToFavs}
              addToPantry={addToPantry}
              favList={favs}
              user={user}
              pantryList={pantryList}
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
            
          </div>
        </div>        
       
        <Footer />
      </div>
    );
}

export default App;
