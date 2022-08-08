// ProtectedRoute.js
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state: any) => state.user!)
    console.log('userinfo', userInfo)

  if (userInfo===null) {
    return (
      <div className='flex items-center justify-center w-screen h-screen text-2xl'>
        <h1>Parece que estás perdido :( </h1>
        <span>
          <NavLink to='/login'> Inicia Sesión </NavLink> por aquí.
        </span>
      </div>
    )
  }

  return <Outlet />
}
export default ProtectedRoute