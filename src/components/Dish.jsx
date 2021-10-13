import React from 'react';

const Dish = ({dish, getDetail}) => {
    const styles = {
        cardBody:{            
            height: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center" 
        }
    }
    return (
        <div className="col-sm-4 col-md-3 bg-dark">
            <div className="card max-height-190 mx-1 my-2" onClick={()=>getDetail(dish.id)}>  
                <img className="card-image-top image-fluid" src={dish.image} alt={dish.title}/>
                <div className="card-body" style={styles.cardBody}>
                    <p className="card-title text-center small my-auto">{dish.title}</p>
               </div>
            </div>
        </div>
    );
}

export default Dish;