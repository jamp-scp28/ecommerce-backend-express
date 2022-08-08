import './App.css'
import HeaderComponent from './Components/header/header'
import FooterComponent from './Components/footer/footer'
import StorePage from './pages/store/storePage'
import ProtectedRoute from './Components/shared/protectedRoute'
import UserProfile from './pages/user-profile/user-profile'
import LoginComponent from './pages/account/login'
import RegisterScreen from './pages/account/register'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CartPage from './pages/cart/cartPage'
import LandingPage from './pages/landingpage/landingpage'

function App() {

  return (
      <BrowserRouter>
        <HeaderComponent />
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
      </BrowserRouter>
  )
}

export default App
