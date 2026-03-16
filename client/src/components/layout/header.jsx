import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Datos del usuario en Header:", userData);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center px-8 py-3 bg-[#4C191B] border-b border-[#270c0d] shadow-md">

      {/* Logo */}
      <Link to="/inicio" className="flex items-center gap-3">
        <img
          className="h-14 w-14 object-cover rounded-xl"
          src="/logo.jpg"
          alt="Logo"
        />

        <span className="text-xl font-bold text-[#f5f5f5] tracking-wide">
          Cinemax
        </span>
      </Link>

      {/* User section */}
      <div className="flex items-center gap-6">

        {/* Usuario */}
        <div className="flex items-center gap-3 bg-[#5c2022] px-4 py-2 rounded-lg">
          <FaUserCircle className="text-[#f5f5f5]" size={28} />

          <div className="flex flex-col leading-tight">
            <span className="text-sm text-gray-300">Bienvenido</span>
            <span className="text-md font-semibold text-white">
              {userData.name || "Usuario"}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={userData.name === ""}
          className="flex items-center gap-2 bg-[#7a2629] hover:bg-[#912e32] transition px-4 py-2 rounded-lg text-white disabled:opacity-50"
        >
          <IoLogOut size={20} />
          Salir
        </button>

      </div>
    </header>
  );
};

export default Header;