import { useState } from "react";
import AboutComponent from "../about/about";
import HeaderComponent from "../header/header";
import './home.css'
import {FaMountain} from "react-icons/fa";

function HomeComponent(){
    return (
        <>
        <div className="parallax w-full h-screen bg-center bg-fixed bg-cover custom-img">
        {/* <div className="parallax__layer parallax__layer__5 mt-0">
            <img
            src="https://firebasestorage.googleapis.com/v0/b/myprojects-37d11.appspot.com/o/Portafolio%2FupperLayer.svg?alt=media&token=4d92968e-599e-4055-b2f6-fa28a145281c"
            />
        </div> */}
    
        <div className="parallax__layer parallax__layer__6">
            <img
            src="https://firebasestorage.googleapis.com/v0/b/myprojects-37d11.appspot.com/o/ride.legal%2Fbike-removebg-preview.png?alt=media&token=4ebade45-3608-4063-885b-eea08f139766"
            />
        </div>

        {/* <div className="parallax__layer parallax__layer__4">
            <img
            src="https://firebasestorage.googleapis.com/v0/b/myprojects-37d11.appspot.com/o/Portafolio%2FbirdLayer.svg?alt=media&token=8ec22399-db0c-435d-8596-6a857437bb4e"
            />
        </div> */}

        <div className="parallax__cover z-49">
        
        </div>
        </div>
        
        <AboutComponent />
        </>
       
    )
}

export default HomeComponent;