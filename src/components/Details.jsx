import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
 

const Details = ({details, show, close}) => {    
    const htmlString = details.summary    
    return (        
        <Modal          
        show={show} 
        onHide={close}
        size="lg"
        >
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
                        <h5 className="mt-2">Ingredients</h5>
                        <div className="row">
                            {details.extendedIngredients ? details.extendedIngredients.map(i => {
                            return ( <div className="col-4 small">{i.name}</div>)
                            }) : ""
                            }
                        </div>                 
                    </div>
                 </div>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={close}>
            Save 
           </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default Details;
