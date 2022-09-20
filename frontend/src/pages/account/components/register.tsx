import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerUser } from '../../../redux/actions/auth-actions' 

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: any) => state.user
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/account')
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile')
  }, [navigate, userInfo, success])

  const submitForm = (data: any) => {
    // check if passwords match
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
  }

  return (
  <div className="flex w-screen justify-center items-center min-h-screen top-[40%] pb-10">
    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[45%] bg-blue border-0 shadow-lg rounded-3xl mt-[12%]">

        <h1 className="w-full text-center py-3 text-white font-bold text-2xl mb-[2rem]">
          Regístrate
        </h1>

        <form onSubmit={handleSubmit(submitForm)}>

          <div className="z-0 w-full mb-5 flex flex-row p-4">
            <input type="text" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Nombre Usuario" {...register("username", {required: true, max: 50, min: 3, maxLength: 80})} />
            <input type="email" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Email" {...register("email", {required: true, maxLength: 100, pattern: /^\S+@\S+$/i})} />
          </div>
          
          <div className="z-0 w-full mb-5 flex flex-row p-4">
            <input type="password" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden"
          placeholder="contraseña" {...register("password", {required: true})} />
            <input type="text" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Nombre Completo" {...register("fullname", {required: true, maxLength: 120})} />
          </div>
          
          <div className="z-0 w-full mb-5 flex flex-row p-4">
            <input type="text" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Dirección" {...register("address", {required: true})} />
            <input type="number" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Edad" {...register("age", {required: true})} />
          </div>

          <div className="z-0 w-full mb-5 flex flex-row p-4">
            <input type="text" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Prefijo Teléfono" {...register("phone_number_prefix", {required: true})} />
            <input type="number" className="m-4 placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="Teléfono" {...register("phone_number", {})} />
          </div>

          <div className="z-0 w-full mb-5">
            <input type="text" className="placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golden" placeholder="avatar" {...register("avatar", {})} />
          </div>

          <button
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-3 text-lg text-white font-bold hover:text-golder transition-all duration-150 ease-linear hover:rounded-xl shadow-xl border-1 outline-none hover:bg-bluex2 hover:shadow-xl focus:outline-none"
              >
              Crear Cuenta
          </button>

        </form>
      <NavLink className="text-white p-2 text-center" to='/login'> Ya tienes cuenta? Inicia Sesión </NavLink>
    </div>
  </div>
  )
}
export default RegisterScreen