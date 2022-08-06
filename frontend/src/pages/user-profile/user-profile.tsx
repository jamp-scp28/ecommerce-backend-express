import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../redux/reducers/auth-slice"; 
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { userInfo } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/account");
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <button onClick={handleLogout} >logout</button>
        </div>
    )
}

export default UserProfile;