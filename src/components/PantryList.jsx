import React, {useState} from 'react';

const Pantrylist = ({list, addToLIst, removeFromList}) => {
    const [item, setItem] = useState("")

    const handleChange = (event) => {
        event.preventDefault()
        setItem(event.target.value)
    }
    const addItem = (e) => {
        e.preventDefault()
         addToLIst(item)
    }
    const remove = (element) => {
        removeFromList(element)
    }
    
    return (
        <div className="col-2 border border-white">
            <h3 className="text-center">pantry</h3>
            <form onSubmit={addItem}>
                <input onChange={handleChange} placeholder="add ingredients"></input>
            </form>
            <div className="mt-3">
                {list.map(ingredient => 
                <div className="d-flex justify-content-between">
                    <p>{ingredient}</p>
                    <p onClick={()=>remove(ingredient)}>x</p>
                </div>)}
            </div>
        </div>
    );
}
export default Pantrylist;
