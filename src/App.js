import './App.css';
import NavBar from './components/NavBar';
import React, { useState } from 'react'
import Search from './components/Search';
import Details  from "./components/Details";
import Dish from './components/Dish';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => { 
  const [query, setQuery] = useState({})
  const [dishes, setDishes] = useState([])
  const [details, setDetails] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false)

  const search = async ({ word, diet, cuisine, dishType, offset} ) => {
    setQuery({word, diet, cuisine, dishType, offset})
    setLoading(true)
    var str = ""
    str = diet !== "diet" ? str + "&diet=" + diet : str
    str = cuisine !== "cuisine" ? str + "&cuisine=" + cuisine : str
    str = dishType !== "dishType" ? str + "&type=" + dishType : str
    str = str + "&offset=" + offset
    console.log(str)    
    const queryString = `http://localhost:3001/api/search?word=${word + str}`
    const data = await fetch(queryString)
    const result = await data.json()
    console.log(result.results)
    setDishes(dishes.concat(result.results))
    setLoading(false)       
  }

 const getMore = async () => {
  const newOffset = query.offset+10
  setQuery({...query,
    offset: newOffset
  })
  await search(query)  

  }

  const getDetail = async (id) => {
    console.log(id)
    const queryString = `http://localhost:3001/api/${id}`
      const data = await fetch(queryString)
      const result = await data.json()
      console.log(result)
      setDetails(result)
      handleShow()
  }

  const handleFormChange = () => {
    setDishes([])
    //search(query)
  }



  return (
      <div className="bg-dark">
        <NavBar />
        <Search handleSearch = {search} formChange={handleFormChange}/>
        <div className="container-fluid px-3 bg-dark pb-3">
          <div className="row">
          {
            
            dishes.length === 0 
            ? <div style={{color: "white"}}>no dishes to show</div>
            : dishes.map(dish => <Dish key={dish.id} dish={dish} getDetail={getDetail} />)

          }
          <LoadingSpinner visibility={loading}
          />
          <button onClick={getMore}>Get More</button>
          
          <Details 
              details={details}
              show={show}
              close={handleClose}
            />
          
          </div>
        </div>
        
        <Details 
              details={details}
              show={show}
              close={handleClose}
            />
        <Footer />
      </div>
    );
}

export default App;
