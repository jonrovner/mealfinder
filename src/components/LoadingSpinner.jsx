import React from 'react';
import Loader from 'react-loader-spinner'


const LoadingSpinner = ({visibility}) => {
    
    return (
         <div className="text-center w-100 h-100">
            <Loader 
                visible={visibility? "true" : "false"}
                type="Circles"
                color="#00BFFF"
                height={200}
                width={200}
                
              
            />
        </div>
    );
}

export default LoadingSpinner;
