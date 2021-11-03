import  React, {useState} from 'react';
import axios from 'axios';

const Search = ({getDishes}) => {

    const [word, setWord] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [dishType, setDishtype] = useState("")
    const [offset, setOffset] = useState(0)
    
    const search = (e) => {
        e.preventDefault()
        console.log("searching")
        var str = ""    
        str = cuisine !== "cuisine" ? str + "&cuisine=" + cuisine : str
        str = dishType !== "dishType" ? str + "&type=" + dishType : str
        str = str + "&offset=" + offset    
        const queryString = `http://localhost:3001/api/dishes/search?word=${word + str}`
        axios.get(queryString).then(response => {
            getDishes(response.data.results)
        })
        const newOffset = offset + 10
        setOffset(newOffset)            
    }   

       
    return (
        <div className="container-fluid bg-dark pb-10 text-center">
            <h2 className="display-4 text-white p-5">Foodgle</h2>
            <form className="pb-5" onSubmit={(e) => search(e)}>
            <div className="mb-3">
                    <select className="p-1" name="cuisine" id="cuisine" 
                      onChange={(event)=>setCuisine(event.target.value)}>
                        <option value="">cuisine</option>
                        <option value="italian">Italian</option>
                        <option value="mediterranean">Meditarranean</option>
                        <option value="french">French</option>
                        <option value="american">American</option>
                        <option value="spanish">Spanish</option>
                        <option value="chinese">Chinese</option>
                        <option value="thai">Thai</option>
                        <option value="nordic">Nordic</option>
                        <option value="mexican">Mexican</option>
                        <option value="japanese">Japanese</option>
                    </select>

                    <select className="p-1" name="dishType" id="type" 
                      onChange={(event)=>setDishtype(event.target.value)}>
                        <option value="">Meal type</option>
                        <option value="main">Main course</option>
                        <option value="side dish">Side dish</option>
                        <option value="soup">Soup</option>
                        <option value="salad">Salad</option>
                        <option value="dessert">Dessert</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="snack">Snack</option>
                    </select>
                    </div>
                
                <input 
                    value={word}
                    onChange={(event) => setWord(event.target.value)}
                    
                />
                <button type="submit">search</button>    
            </form>
            
            
        </div>
    );
}

export default Search;




