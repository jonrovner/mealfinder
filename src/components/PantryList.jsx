import React from 'react';

const Pantrylist = ({list, addToLIst, removeFromList}) => {
    //  const [item, setItem] = useState("")

  /*   const handleChange = (event) => {
        event.preventDefault()
        setItem(event.target.value)
    }
    const addItem = (e) => {
        e.preventDefault()
         addToLIst(item)
    } */
    const remove = (element) => {
        removeFromList(element)
    }
    
    return (
        <div className="col-2 border border-white">
            <h3 className="text-center">pantry</h3>
            
            <div className="mt-3">
                {list.map((ingredient, index) => 
                <div key={index}  className="ingredient d-flex justify-content-between">
                    <p>{ingredient}</p>
                    <p className="closeX" onClick={()=>remove(ingredient)}>x</p>
                </div>)}
            </div>
        </div>
    );
}
export default Pantrylist;
