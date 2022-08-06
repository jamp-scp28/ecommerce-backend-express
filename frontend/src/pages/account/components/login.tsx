import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/auth-actions";
import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate();
  const { loading, userInfo, error, success } = useSelector(
    (state: any) => state.user
  )
    
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const dispatch = useDispatch();
    
  const submitForm = (data: any) => {
    console.log('loginData', data)
    dispatch(loginUser(data));
  }

    return (
        <div className="flex w-screen justify-center items-center min-h-screen mb-10">
            <div className="flex flex-col justify-center items-center w-[90%] sm:w-[30%] p-4 bg-blue border-0 shadow-lg rounded-3xl mt-[12%]">
              <section>
                    <h1 className="w-full text-center py-3 text-white font-bold text-2xl mb-[2rem]">
                        Inicia Sesión
                    </h1>
                    <img src="https://firebasestorage.googleapis.com/v0/b/myprojects-37d11.appspot.com/o/Portafolio%2FjarLogo.svg?alt=media&token=0848974a-3342-4b63-8458-22fa5e17aa9c"
                     className="w-full mx-auto object-center mt-5 mb-[5rem] cursor-pointer"></img>

                    <form onSubmit={handleSubmit(submitForm)}>
                    <div>{error}</div>
                    <div className="relative z-0 w-full mb-5">
                        <input type="email" className="placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golder" placeholder="Ingresa tu email" {...register("email", {required: true, maxLength: 100, pattern: /^\S+@\S+$/i})} />
                        <span className="text-sm text-red-600 hidden" id="error">Email is required</span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                            <input type="password" className="placeholder:italic placeholder:text-white placeholder:font-bold pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-golder"
                            placeholder="Ingresa tu contraseña" {...register("password", {required: true})} />
                        <span className="text-sm text-red-600 hidden" id="error">Password is required</span>
                    </div>
                    <button
                        id="button"
                        type="submit"
                        className="w-full px-6 py-3 mt-3 text-lg text-white font-bold hover:text-golder transition-all duration-150 ease-linear hover:rounded-xl shadow-xl border-1 outline-none hover:bg-bluex2 hover:shadow-xl focus:outline-none"
                        >
                        Entrar
                    </button>
                  </form>
              </section>
              <NavLink className="text-white p-2 text-center" to='/register'> No tienes cuenta? Regístrate aquí </NavLink>
            </div>
        </div>
    )
}

export default LoginComponent;