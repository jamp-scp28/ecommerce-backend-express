import { FaCartPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountComponentHeader = () => {
    return (
        <div className="text-white text-3xl w-[15%] h-10 flex flex-row absolute right-5 top-5">
            <Link to='/account'>
                <FaUser className='mr-10 hover:cursor-pointer hover:scale-105'/>
            </Link>
            <Link to='/cart'>
                <FaCartPlus className='mr-1 hover:cursor-pointer hover:scale-105'/>
            </Link>
        </div>
    )
}

export default AccountComponentHeader;