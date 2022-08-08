import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/actions/auth-actions' 

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: any) => state.user
  )
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
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
  
  <div className="flex items-center justify-center w-screen min-h-screen bg-teal-400">
    <div className="flex justify-center items-center w-[95%] sm:w-[90%] h-auto bg-teal-400 rounded-xl mb-5">
      <div className="flex flex-col justify-center items-center w-[90%] sm:w-[45%] p-4 bg-white border-0 shadow-2xl rounded-3xl mt-[12%] mb-5">
        <h1 className="w-full text-center py-3 text-teal-400 font-bold text-2xl mb-[2rem]">
          Regístrate
        </h1>

        <form onSubmit={handleSubmit(submitForm)}>

          <div className="z-0 flex flex-row w-full p-4 mb-5">
            <input type="text" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Nombre Usuario" {...register("username", {required: true, max: 50, min: 3, maxLength: 80})} />
            <input type="email" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Email" {...register("email", {required: true, maxLength: 100, pattern: /^\S+@\S+$/i})} />
          </div>
          
          <div className="z-0 flex flex-row w-full p-4 mb-5">
            <input type="password" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden"
          placeholder="contraseña" {...register("password", {required: true})} />
            <input type="text" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Nombre Completo" {...register("fullname", {required: true, maxLength: 120})} />
          </div>
          
          <div className="z-0 flex flex-row w-full p-4 mb-5">
            <input type="text" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Dirección" {...register("address", {required: true})} />
            <input type="number" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Edad" {...register("age", {required: true})} />
          </div>

          <div className="z-0 flex flex-row w-full p-4 mb-5">
            <input type="text" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Prefijo Teléfono" {...register("phone_number_prefix", {required: true})} />
            <input type="number" className="block w-full px-0 pt-3 pb-2 m-4 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="Teléfono" {...register("phone_number", {})} />
          </div>

          <div className="z-0 w-full mb-5">
            <input type="text" className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golden" placeholder="avatar" {...register("avatar", {})} />
          </div>

          <button
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-3 text-lg font-bold text-teal-400 transition-all duration-150 ease-linear shadow-xl outline-none hover:text-yellow hover:rounded-xl border-1 hover:bg-teal-400 hover:shadow-xl focus:outline-none"
              >
              Crear Cuenta
          </button>

        </form>
        <NavLink className="p-2 text-center text-grey-800" to='/login'> Ya tienes cuenta? Inicia Sesión </NavLink>
      </div>
    </div>
  </div>
  )
}
export default RegisterScreen