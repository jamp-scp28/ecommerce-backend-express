import { useState } from "react";
import './header.css'
import { Link } from "react-router-dom";

function NavLink({text,link}:{text:string,link:string}){
    return(
        <Link to={link}>
              <div className="p-2 pl-4 pr-4 text-white font-bold">
                <span className="">
                    {text}
                </span>
            </div>
        </Link>
    )
}

export default NavLink;