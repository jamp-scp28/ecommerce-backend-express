import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/auth-actions";
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
        <div className="flex items-center justify-center w-screen min-h-screen bg-teal-400">
          <div className="flex justify-center items-center w-[95%] sm:w-[90%] h-auto bg-teal-400 rounded-xl mb-5">
            <div className="flex flex-col justify-center items-center w-[90%] sm:w-[35%] p-4 bg-white border-0 shadow-2xl rounded-3xl mt-[12%] mb-5">
              <section>
                    <h1 className="w-full text-center py-3 text-teal-400 font-bold text-2xl mb-[2rem]">
                        Inicia Sesión
                    </h1>
                    <div className="relative mb-6 overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
                    style={{backgroundPosition: "50%"}} data-mdb-ripple="true" data-mdb-ripple-color="light">
                      <img src="https://mdbootstrap.com/img/new/standard/city/041.jpg" className="w-full" />
                      <a href="#!">
                        <div
                        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out bg-fixed opacity-0 mask hover:opacity-100"
                        style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                      </a>
                    </div>

                    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(submitForm)}>

                    <div className="relative z-0 w-full mb-5">
                        <input type="email" className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golder" placeholder="Ingresa tu email" {...register("email", {required: true, maxLength: 100, pattern: /^\S+@\S+$/i})} />
                        <span className="hidden text-sm text-red-600" id="error">Email es requerido</span>
                    </div>
                    <div className="relative z-0 w-full mb-5">
                            <input type="password" className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none placeholder:italic placeholder:text-teal-400 placeholder:font-bold focus:outline-none focus:ring-0 focus:border-golder"
                            placeholder="Ingresa tu contraseña" {...register("password", {required: true})} />
                        <span className="hidden text-sm text-red-600" id="error">Password es requerido</span>
                    </div>

                    {
                      error ?
                      <span className="w-auto h-auto p-2 text-center text-white rounded-lg bg-red">Usuario o Contraseña no coinciden</span>
                      :
                      null
                    }

                    <button
                        id="button"
                        type="submit"
                        className="w-full px-6 py-3 mt-3 text-lg font-bold text-teal-400 transition-all duration-150 ease-linear shadow-xl outline-none hover:text-yellow hover:rounded-xl border-1 hover:bg-teal-400 hover:shadow-xl focus:outline-none"
                        >
                        Entrar
                    </button>


                  </form>
              </section>
              <NavLink className="p-2 text-center text-grey-600" to='/register'> No tienes cuenta? Regístrate aquí </NavLink>
            </div>
          </div>
        </div>
    )
}

export default LoginComponent;