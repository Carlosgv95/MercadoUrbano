import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Navbar from './components/Navbar/Navbar';
import Registro from './components/Registro/Registro'
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    // 2. Envuelve toda la aplicación con el UserProvider
    <UserProvider> 
      <Router>
        <Navbar /> 
        <Routes>
          {/* Rutas que necesitan el contexto */}
          <Route path="/" element={<Home />} />
          <Route path="/ingreso" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
