import './App.css';
import React, { useState } from 'react'
import {Details, Dish, Favs, Footer, LoadingSpinner, NavBar, PantryList, Search, LoginModal} from './components/index'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => { 
  function useStickyState(defaultValue, key) {
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
  const [word, setWord] = useState("")
  const [diet, setDiet] = useState("diet")
  const [cuisine, setCuisine] = useState("cuisine")
  const [dishType, setDishType] = useState("dishType")
  const [offset, setOffset] = useState(0)
  const [pantryList, setPantryList] = useStickyState([], "pantryList")
  const [favs, setFavs] = useStickyState([], "favs")
  const [dishes, setDishes] = useState([])
  const [details, setDetails] = useState({})
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const search = async ({word, diet, cuisine, dishType, offset}) => {
    setWord(word)
    setDiet(diet)
    setCuisine(cuisine)
    setDishType(dishType)
    setOffset(offset)    
    setLoading(true)    
    var str = ""
    str = diet !== "diet" ? str + "&diet=" + diet : str
    str = cuisine !== "cuisine" ? str + "&cuisine=" + cuisine : str
    str = dishType !== "dishType" ? str + "&type=" + dishType : str
    str = str + "&offset=" + offset    
    const queryString = `http://localhost:3001/api/dishes/search?word=${word + str}`
    console.log(queryString)    
    axios.get(queryString).then(response => {
      console.log(response.data)
      setDishes(response.data.results)
    })
    const newOffset = offset + 10
    setOffset(newOffset)
    setLoading(false)       
  }

  const getMore = async () => {   
    await search({word, diet, cuisine, dishType, offset})  
  }

  const getDetail = async (id) => {    
    setLoading(true)
    const queryString = `http://localhost:3001/api/dishes/${id}`
    axios.get(queryString).then(response => {
      setLoading(false)
      setDetails(response.data)
      handleShow()
    })
  }

  const handleFormChange = () => {
    setDishes([])
  }

  const addToPantry = (name) => {
    setPantryList(pantryList.concat(...name))
  }
  const removeFromPantry = (name) => {
   setPantryList(pantryList.filter(e => e!==name))
  }

  const addToFavs = (id) => {
    setFavs(favs.concat(id))
  }
  const removeFromFavs = item => {
    setFavs(favs.filter(fav => fav.title !== item.title))
  }

  const handleDetails = (detailObject) => {
    setDetails(detailObject)
    handleShow()
  }

  const login = (credentials) => {
    console.log("login in with : ", credentials.username, credentials.password  )
    axios.post('http://localhost:3001/api/login', credentials).then(response =>{
      console.log(response.data)
      setUser(response.data)
    })
  }

  return (
      <div className="bg-dark ">
        <NavBar user={user} login={login} openLoginModal={handleLoginShow}/>
        <LoadingSpinner visibility={loading}/>
        <Search handleSearch = {search} formChange={handleFormChange}/>
        <div className="container p-3 d-flex flex-column justify-content-center align-items-center">
          <div className="row text-white p-2 border border-white">
            <PantryList 
              list={pantryList} 
              addToLIst={addToPantry} 
              removeFromList={removeFromPantry}/>
            <div className="col-6 container ">
            {            
              dishes.length === 0 
              
              ? <div className="d-flex flex-column justify-content-center align-items-center" 
                      style={{color: "white", height: "30rem"}}>
                          <p>Search dishes by name or ingredient</p>
                </div>
              : <div className="row py-2">
                {dishes.map(dish => 
                  <Dish key={dish.id} dish={dish} getDetail={getDetail} />)
                }</div>
            }

            </div>
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
            />
            <LoginModal 
              show={showLogin}
              close={handleLoginClose}
              handleLogin={login}
              user={user}
            />
          </div>
        </div>        
        <div className="container-fluid text-center pb-10 mb-5">
          <Button variant="secondary" onClick={getMore} size="lg">Get More</Button>
        </div>
        <Footer />
      </div>
    );
}

export default App;
