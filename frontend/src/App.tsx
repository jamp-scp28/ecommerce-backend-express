<<<<<<< HEAD
import './App.css'
import HeaderComponent from './Components/header/header'
import FooterComponent from './Components/footer/footer'
import StorePage from './pages/store/storePage'
import ProtectedRoute from './Components/shared/protectedRoute'
import UserProfile from './pages/user-profile/user-profile'
import LoginComponent from './pages/account/login'
import RegisterScreen from './pages/account/register'
=======
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


>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
<<<<<<< HEAD
import CartPage from './pages/cart/cartPage'
import LandingPage from './pages/landingpage/landingpage'
=======
import AccountComponent from './pages/account/account'
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005

function App() {

  return (
      <BrowserRouter>
        <HeaderComponent />
<<<<<<< HEAD
          <Routes>
            <Route path="/login" element={<LoginComponent/>}></Route>
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/store" element={<StorePage />} />
            <Route element={<ProtectedRoute />} >
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/user-profile" element={<UserProfile />} /> 
            </Route>
            <Route path="/" element={<LandingPage />} />
            
          </Routes>
        <FooterComponent />
=======
        <Routes>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path="/store" element={<StorePage />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/user-profile" element={<UserProfile />} /> 
          </Route>
        </Routes>
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
      </BrowserRouter>
  )
}

export default App
