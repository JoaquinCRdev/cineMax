import Auth from "./pages/auth.jsx"
import Header from "./components/layout/header.jsx"
import Catalogo from "./components/layout/home/catalogo.jsx"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/auth'];

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Catalogo />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App