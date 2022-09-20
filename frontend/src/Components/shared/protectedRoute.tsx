// ProtectedRoute.js
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state: any) => state.user!)
    console.log('userinfo', userInfo)
<<<<<<< HEAD

  if (userInfo===null) {
    return (
      <div className='flex items-center justify-center w-screen h-screen text-2xl'>
        <h1>Parece que estás perdido :( </h1>
        <span>
          <NavLink to='/login'> Inicia Sesión </NavLink> por aquí.
=======
  // show unauthorized screen if no user is found in redux store
  if (userInfo===null) {
    return (
      <div className='bg-legal w-screen h-screen flex justify-center items-center text-white text-2xl'>
        <h1>Unauthorized :( </h1>
        <span>
          <NavLink to='/account'> Login </NavLink> to gain access
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
        </span>
      </div>
    )
  }

<<<<<<< HEAD
=======
  // returns child route elements
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
  return <Outlet />
}
export default ProtectedRoute