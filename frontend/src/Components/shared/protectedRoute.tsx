// ProtectedRoute.js
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state: any) => state.user!)
    console.log('userinfo', userInfo)
  // show unauthorized screen if no user is found in redux store
  if (userInfo===null) {
    return (
      <div className='bg-legal w-screen h-screen flex justify-center items-center text-white text-2xl'>
        <h1>Unauthorized :( </h1>
        <span>
          <NavLink to='/account'> Login </NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute