import React from 'react';
import './Footer.css'; // Puedes crear estilos aparte

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>MercadoUrbano</h3>
        <p>Tu mercado digital de confianza</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Ayuda</h4>
          <ul>
            <li><a href="/faq">Preguntas frecuentes</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/envios">Envíos y devoluciones</a></li>
          </ul>
        </div>
        <div>
          <h4>Cuenta</h4>
          <ul>
            <li><a href="/login">Ingresar</a></li>
            <li><a href="/registro">Regístrate</a></li>
            <li><a href="/perfil">Mi perfil</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="/terminos">Términos y condiciones</a></li>
            <li><a href="/privacidad">Política de privacidad</a></li>
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