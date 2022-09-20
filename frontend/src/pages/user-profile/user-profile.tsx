import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../redux/reducers/auth-slice"; 
import { useNavigate } from "react-router-dom";
import CallToActionBookNow from "../../Components/shared/ctoBook";
import FAQComponent from "../../Components/shared/faq";
const UserProfile = () => {
    const { userInfo } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/account");
    }

    return (
        <>
        <div className="w-screen min-h-screen flex justify-center items-center bg-teal-400">
            <div className="flex flex-col justify-center items-center w-[90%] h-[90%] mt-[10%] mb-5 bg-white rounded-xl">
                <div className="w-full md:w-3/4 md:px-3 p-2 mt-3 flex justify-center items-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-500 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">Nos alegra que estés aquí!</span>
                    </h1>
                </div>
                <CallToActionBookNow />
                <FAQComponent />
            </div>
        </div>
        </>
    )
}

export default UserProfile;