import Auth from "./pages/auth.jsx"
import Header from "./components/layout/header.jsx"
import Home from "./pages/home.jsx";
import Seats from "./pages/seats.jsx";
import Compra from "./pages/compra.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/auth'];
  const { isAuth } = useSelector((state) => state.user);

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
          <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
          <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path="/seats" element={
            <ProtectedRoutes>
              <Seats />
            </ProtectedRoutes>
          } />
          <Route path="/compra" element={
            <ProtectedRoutes>
              <Compra />    
            </ProtectedRoutes>
          } />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    console.log("Usuario no autenticado, redirigiendo a /auth");
    return <Navigate to="/auth" />;
  }

  return children;
}
export default App