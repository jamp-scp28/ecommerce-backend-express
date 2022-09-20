<<<<<<< HEAD
import AccountComponentHeader from "./accountComponentHeader";
import LinkComponent from "./links";

function HeaderComponent(){
    return(
        <>
        <section className="fixed z-50 w-screen px-3 antialiased bg-blue lg:px-6" data-tails-scripts="//unpkg.com/alpinejs">
            <div className="mx-auto max-w-7xl">
                <nav className="flex items-center w-full h-24 select-none" x-data="{ showMenu: false }">
                    <div className="relative flex flex-wrap items-center justify-between w-full h-24 mx-auto font-medium md:justify-center">
                        <a href="#_" className="w-1/4 py-4 pl-6 pr-4 md:pl-4 md:py-0">
                            <span className="p-1 text-xl font-black leading-none text-white select-none"><span>tails</span><span className="text-indigo-300">.</span></span>
                        </a>
                        <div className="fixed top-0 left-0 z-40 items-center hidden w-full h-full p-3 text-xl bg-gray-900 bg-opacity-50 md:text-sm lg:text-base md:w-3/4 md:bg-transparent md:p-0 md:relative md:flex">
                            <div className="flex-col w-full h-full overflow-hidden bg-white rounded-lg select-none md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
                                <div className="flex flex-col items-center justify-center w-full h-full mt-12 text-center text-indigo-700 md:text-indigo-200 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                                    <LinkComponent link="/" routeName="Inicio" />
                                    <LinkComponent link="/store" routeName="Tienda" />
                                </div>
                               <AccountComponentHeader /> 
                            </div>
                        </div>
                        <div className="absolute right-0 z-50 flex flex-col items-end w-10 h-10 p-2 mr-4 rounded-full cursor-pointer md:hidden hover:bg-gray-900 hover:bg-opacity-10">
                            <svg className="w-6 h-6" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" x-cloak="">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            <svg className="w-6 h-6" x-show="showMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" x-cloak="">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
        </>
=======
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
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
    )
}

export default HeaderComponent;