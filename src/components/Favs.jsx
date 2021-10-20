import React from 'react';

const Favs = ({favList, handleDetails, remove, user}) => {
           
    return (<div className="col-3 container border border-white mt-2">
            <div className="row pt-2 gy-3">
                <h2 className="text-center">favs</h2>
                {   
                user !== null  ?
                    favList.map(item => 
                    <div key={item.id}
                        className="favItem col-12 d-flex flex-column justify-content-between  align-items-center ">
                        <p onClick={() => remove(item)} className="closeButton">X</p>
                        <div className="d-flex flex-column justify-content-between  align-items-center" 
                            onClick={(e)=>{
                                e.stopPropagation()
                                handleDetails(item)
                        }}>
                        <img src={item.image} style={{width: 50, height:40}} className="rounded-circle"  alt="" />
                        <p className="small text-center pt-1">{item.title}</p>
                        </div>                           
                    </div>)             
                :  <div>Sign in to see your favs</div>
                } 
            </div>
            </div>)
         

            
 }


export default Favs;
