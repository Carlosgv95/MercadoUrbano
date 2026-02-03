import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        
        {/* Marca */}
        <div className="footer-section brand">
          <h3>MercadoUrbano</h3>
          <p>Tu mercado digital de confianza</p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
          </ul>
        </div>

        {/* Cuenta */}
        <div className="footer-section">
          <h4>Cuenta</h4>
          <ul>
            <li><Link to="/ingreso">Ingresar</Link></li>
            <li><Link to="/registro">Regístrate</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/privacidad">Política de privacidad</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MercadoUrbano - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;


