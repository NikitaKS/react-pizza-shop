import React from 'react';
import './../App.css'
import preloader from "../assets/images/Spinner.svg";

let Preloader = (props) => {
    return (
        <div className='container'>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;