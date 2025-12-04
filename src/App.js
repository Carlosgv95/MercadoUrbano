import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import ProductSlider from './components/ProductSlider/ProductSlider';
import Registro from './components/Registro/Registro'

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/* Ruta de la página principal */}
        <Route path="/" element={
          <>
            <Header />
            <ProductSlider />
          </>
        } />
        {/* Ruta para el formulario de registro */}
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
