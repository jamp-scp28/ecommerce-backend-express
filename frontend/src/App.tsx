import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import HeaderComponent from './Components/header/header'
import HomeComponent from './Components/home/home'
import AboutComponent from './Components/about/about'
import FooterComponent from './Components/footer/footer'
import StorePage from './pages/store/storePage'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ProtectedRoute from './Components/shared/protectedRoute'
import UserProfile from './pages/user-profile/user-profile'
import LoginComponent from './pages/account/components/login'
import RegisterScreen from './pages/account/components/register'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AccountComponent from './pages/account/account'

function App() {

  return (
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="/store" element={<StorePage />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/user-profile" element={<UserProfile />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
