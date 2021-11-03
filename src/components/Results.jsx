import React from 'react';
import Dish from './Dish';

const Results = ({dishes, getDetail}) => {
    
    
    return (

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
            }
          </div>
      }
      </div>
    );
}

export default Results;
