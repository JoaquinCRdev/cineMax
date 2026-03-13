import Register from "../components/layout/auth/register.jsx"
import Login from "../components/layout/auth/login.jsx"
import { useState } from "react"


const Auth = () => {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">

      {/* Left section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        
        {/* Background image */}
        <img className="w-full h-full object-cover" src="/cine.jpg" alt="restaurant image"/>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-white text-2xl italic">
          Peliculas nuevas todos los viernes 
          <br />
          <span className="block mt-4 text-yellow-400">- Av. Rivadavia 564</span>
        </blockquote>
      

      </div>

      {/* Right section */}
      <div className="w-1/2 min-h-screen bg-[#4C191B] p-5">
        <div className="flex flex-col items-center gap-2">
          <img className="h-20 w-20 border-2 rounded-full " src="logo.jpg" alt="logo" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Cinemax</h1>
        </div>

        <h2 className="text-2xl text-center mt-4 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Crea tu cuenta" : "Bienvenido de nuevo"}
        </h2>

        {/* Components */}
        {isRegister ? <Register /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]"> 
            {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            <a onClick={()=> setIsRegister(!isRegister)} href="#" className="text-yellow-400 font-semibold ml-1 hover:underline">
              {isRegister ? "Inicia Sesión" : "Regístrate"}
            </a>
          </p>

        </div>
      
      
      </div>

    </div>
  )
}

export default Auth