import { useState } from "react";
import { FaIdCard } from "react-icons/fa";
import './account.css'
import LoginComponent from "./components/login";
import RegisterScreen from "./components/register";

function AccountComponent(){
    return (
        <div className="flex w-screen h-screen bg-gray-900 flex-col">
            <LoginComponent/>
            <RegisterScreen/>
        </div>
    )
}

export default AccountComponent;