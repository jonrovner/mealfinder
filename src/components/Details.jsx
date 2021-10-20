import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
 
const Details = ({details, show, close, addToFavs, favList, addToPantry}) => {    
    const htmlString = details.summary   
    const instructions = details.analyzedInstructions 
    ? details.analyzedInstructions.map(element => element.steps)
    :[] 
    const ingredients = details.extendedIngredients
    ?  details.extendedIngredients.map(i => i.name)
    : []    
    const shop = () => {
         addToPantry(ingredients)
    }
    return (        
        <Modal          
        show={show} 
        onHide={close}
        size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{details.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                    <div className="col-3">
                         <Image src={details.image} alt={details.title} fluid rounded />    
                    </div>                        
                    <div className="col-9 small" dangerouslySetInnerHTML={{ __html: htmlString }} />
                    </div>                
                    <div className="row">
                        <h5 className="my-3">Ingredients</h5>
                        <div className="row mx-5">
                            {details.extendedIngredients && details.extendedIngredients
                            .map(i => <div className="col-4 small">{i.name}</div>)                            
                            }
                        </div>
                    </div>
                    <div className="row mt-3">
                         <h5 className="text-center mb-3">Instructions</h5>
                         <ul className="mx-5 px-5 small">
                             { details !== undefined 
                             && instructions.flat().map( i =><li>{i.step}</li>)
                             }                       
                        </ul>       
                    </div>
                 </div>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
              favList.includes(details) ? shop() : addToFavs(details)
          }}>
              {favList.includes(details)? "shop Ingredients" : "add to favs"

              }
            
           </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default Details;
