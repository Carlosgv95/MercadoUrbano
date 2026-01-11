import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Navbar from './components/Navbar/Navbar';
import Registro from './components/Registro/Registro'
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Perfil from './Pages/Perfil/Perfil';
import Productos from './Pages/Productos/Productos';
import CrearPublicacion from './Pages/CrearPublicacion/CrearPublicacion';
import { CartProvider } from './context/CartContext';


const App = () => {
  return (
    // 2. Envuelve toda la aplicación con el UserProvider
    <UserProvider> 
      <CartProvider>
      <Router>
        <Navbar /> 
        <Routes>
          {/* Rutas que necesitan el contexto */}
          <Route path="/" element={<Home />} />
          <Route path="/ingreso" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/perfil" element={ <Perfil />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/crear-publicacion" element={<CrearPublicacion />} />
        </Routes>
        <Footer />
      </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
