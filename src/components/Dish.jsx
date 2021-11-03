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
        <div className="col-sm-12 col-md-6 col-lg-4 bg-dark">
            <div className="card max-height-190 mx-1 my-2" onClick={()=>getDetail(dish.id)}>  
                
                <div className="imageContainer">

                <img className="card-image-top image-fluid cardImage" src={dish.image} alt={dish.title}/>

                </div>
                
                
                <div className="card-body bg-dark" style={styles.cardBody}>
                    <p className="card-title text-center small my-auto">{dish.title}</p>
               </div>
            </div>
        </div>
    );
}

export default Dish;
