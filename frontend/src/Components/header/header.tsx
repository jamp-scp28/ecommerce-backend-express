import { useState } from "react";
import './header.css';
import {FaChartBar} from "react-icons/fa";
import {FaBlog} from "react-icons/fa";
import {FaBiking} from "react-icons/fa";
import {FaMountain} from "react-icons/fa";
import NavIcon from "./navLink";
import LogoComponent from "./logo";
import LinksComponent from "./links";
import AccountComponentHeader from "./accountComponentHeader";

function HeaderComponent(){
    return(
        <nav className="fixed z-50 w-screen h-auto bg-blue flex justify-center items-center flex-col p-2">
                <AccountComponentHeader/>
                <LogoComponent/>
                <LinksComponent/>          
        </nav>
    )
}

export default HeaderComponent;