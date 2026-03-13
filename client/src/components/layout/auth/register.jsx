import { useState } from "react"

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRoleSelection = (selectedRole) => {
        setFormData({
            ...formData,
            role: selectedRole
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit}>

        <div>
          <label className="block text-[#ababab] mb-1 text-sm font-medium">
            Nombre Completo
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              className="w-full bg-transparent text-white px-3 py-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-1 text-sm font-medium">
            Correo Electrónico
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              className="w-full bg-transparent text-white px-3 py-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-1 text-sm font-medium">
            Contraseña
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa una contraseña"
              className="w-full bg-transparent text-white px-3 py-2 focus:outline-none"
              required
            />
          </div>
        </div>

       

        <button
          type="submit"
          className="w-full rounded-lg mt-3 py-2.5 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition duration-200 cursor-pointer"
        >
          Registrarse
        </button>

      </form>
    </div>
  )
}

export default Register