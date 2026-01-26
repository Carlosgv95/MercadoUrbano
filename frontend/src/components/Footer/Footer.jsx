import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <h3>MercadoUrbano</h3>
        <p>Tu mercado digital de confianza</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/envios">Envíos y devoluciones</Link></li>
          </ul>
        </div>
        <div>
          <h4>Cuenta</h4>
          <ul>
            <li><Link to="/ingreso">Ingresar</Link></li>
            <li><Link to="/registro">Regístrate</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/privacidad">Política de privacidad</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MercadoUrbano. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
