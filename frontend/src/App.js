import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Registro from './components/Registro/Registro';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Perfil from './Pages/Perfil/Perfil';
import Productos from './Pages/Productos/Productos';
import MisProductos from './Pages/MisProductos/MisProductos';
import Favoritos from './Pages/Favoritos/Favoritos';
import NotFound from './Pages/NotFound/NotFound';

import Swal from "sweetalert2";
import './App.css';

let hasShownSwal = false; // ⬅️ evita múltiples popups

const AppRoutes = () => {
  const { user, userLoaded } = useContext(UserContext);

  const protect = (component) => {
    if (!userLoaded) return null; // ⏳ Espera a que cargue el usuario

    if (user) return component;

    if (!hasShownSwal) {
      hasShownSwal = true;
      Swal.fire({
        icon: "warning",
        title: "Acceso restringido",
        text: "Debes iniciar sesión para acceder a esta sección",
        confirmButtonText: "Ir a iniciar sesión",
        customClass: {
          popup: "swal2-border-radius",
          confirmButton: "btn-confirm",
        },
        buttonsStyling: false,
      });
    }

    return <Navigate to="/ingreso" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/productos" element={<Productos />} />

      {/* 🔒 Rutas protegidas */}
      <Route path="/perfil" element={protect(<Perfil />)} />
      <Route path="/mis-productos" element={protect(<MisProductos />)} />
      <Route path="/favoritos" element={protect(<Favoritos />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;


