import { FaCartPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {RiLogoutBoxLine} from "react-icons/ri";

const AccountComponentHeader = () => {
    const {userInfo} = useSelector((state: any)=> state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    }
    
    return (
         <div className="flex flex-col items-center justify-end w-full h-full pt-4 md:w-1/3 md:flex-row md:py-0">
            {
                userInfo ?
                <>
                    <Link to='/user-profile'>
                        <div className="flex flex-row items-center justify-center w-full gap-2 pl-6 mr-0 text-white hover:font-bold md:pl-0 md:mr-3 lg:mr-5 md:w-auto"><FaUser/> Mi Cuenta</div>
                    </Link>
                    <Link to='/cart'>
                        <div className="flex flex-row items-center justify-center w-full gap-2 pl-6 mr-0 text-white hover:font-bold md:pl-0 md:mr-3 lg:mr-5 md:w-auto"><FaCartPlus/> Mi Carrito</div>
                    </Link>
                    <div onClick={()=>handleLogout()} className="flex flex-row items-center justify-center w-full gap-2 pl-6 mr-0 text-white hover:cursor-pointer hover:text-red md:pl-0 md:mr-3 lg:mr-5 md:w-auto"><RiLogoutBoxLine/></div>
                </>
                :
                <>
                    <Link to='/login'>
                        <div className="w-full pl-6 mr-0 text-indigo-200 hover:text-white md:pl-0 md:mr-3 lg:mr-5 md:w-auto">Ingresa</div>
                    </Link>
                    <Link to='/register'>
                        <div className="inline-flex items-center justify-center px-4 py-2 mr-1 text-base font-medium leading-6 text-indigo-600 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-full hover:bg-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">Regístrate</div>
                    </Link>
                </>
            }
        </div>
    )
}

export default AccountComponentHeader;