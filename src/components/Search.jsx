import  React, {useState} from 'react';

const Search = ({handleSearch, formChange}) => {
   
   const [query, setQuery] = useState({
       word: "",
       diet: "diet",
       cuisine: "cuisine",
       dishType: "dishType",
       offset: 0
   })
    
    const handleChange = (event) => {
        event.preventDefault()
        formChange()
        switch(event.target.name) {
            case "diet": {
                setQuery({...query,
                    diet: event.target.value})
                break;
            }
            case "cuisine": {
                setQuery({...query, 
                    cuisine: event.target.value})
                break;
            }
            case "dishType":{
                setQuery({...query,
                    dishType: event.target.value})
                break;
            }        
            default:{}
        }
        
        
    }

    const changeWord = (event) => {
        setQuery({...query,
            word: event.target.value})
    }    

    const search = async (event) => {
        event.preventDefault()
        console.log("searching!")
        handleSearch(query)
    }
    
    return (
        <div className="container-fluid bg-dark pb-10 text-center">
            <h2 className="display-4 text-white p-5">Foodgle</h2>
            <form className="pb-5"onSubmit={search} onChange={handleChange}>
            <div className="mb-3">
                    <select className="p-1" name="diet" id="diet">
                        <option value="">diet</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescetarian</option>
                        <option value="paleo">Paleo</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>

                    <select className="p-1" name="cuisine" id="cuisine">
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

                    <select className="p-1" name="dishType" id="type">
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
                    value={query.word}
                    onChange={changeWord}
                    
                />
                <button type="submit">search</button>    
            </form>
            
            
        </div>
    );
}

export default Search;
