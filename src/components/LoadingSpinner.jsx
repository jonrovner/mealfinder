import React from 'react';
import Loader from 'react-loader-spinner'


const LoadingSpinner = ({visibility}) => {    
    return (
         <div className="loader text-center" 
         style={visibility ? {"visibility":"visible"}: {"visibility": "hidden"}} >
            <Loader 
                visible={visibility? "true" : "false"}
                type="Circles"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    );
}

export default LoadingSpinner;
