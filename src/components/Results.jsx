import React from 'react';
import Dish from './Dish';


const Results = ({dishes, getDetail}) => {
    console.log(dishes)    
    
    return (

    <div className="container-fluid px-3 bg-dark pb-3">
        <div className="row">
        {
          dishes === [] 
          ? <div>no dishes to show</div>
          : dishes.map(dish => <Dish 
                                key={dish.id} 
                                dish={dish} 
                                getDetail={getDetail} />)

        }
          
        
        </div>
        
      </div>
    );
}

export default Results;
