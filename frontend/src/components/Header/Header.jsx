import Carousel from "react-bootstrap/Carousel";
import "./Header.css";

const slide1 = "/logo.png";
const slide2 = "https://img.freepik.com/vector-gratis/promocion-ventas-abstractas_23-2148338919.jpg?semt=ais_hybrid&w=740&q=80";
const slide3 = "https://compartirenfamilia.com/wp-content/uploads/2024/04/GettyImages-1371940128-scaled.jpg";

const Header = () => {
  return (
    <Carousel fade interval={4000} className="custom-carousel">
      {/* SLIDE 1: LOGO */}
      <Carousel.Item>
        <div className="carousel-overlay"></div>
        <img className="d-block w-100 carousel-image logo-slide" src={slide1} alt="Logo MercadoUrbano" />
        <Carousel.Caption>
          <h3 className="carousel-title">Bienvenido a MercadoUrbano</h3>
          <p className="carousel-text">Tu mercado digital de confianza</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* SLIDE 2 */}
      <Carousel.Item>
        <div className="carousel-overlay"></div>
        <img className="d-block w-100 carousel-image" src={slide2} alt="Ofertas especiales" />
        <Carousel.Caption>
          <h3 className="carousel-title">Ofertas Especiales</h3>
          <p className="carousel-text">Hasta 50% de descuento por tiempo limitado</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* SLIDE 3 */}
      <Carousel.Item>
        <div className="carousel-overlay"></div>
        <img className="d-block w-100 carousel-image" src={slide3} alt="Tecnología y más" />
        <Carousel.Caption>
          <h3 className="carousel-title">Tecnología, Hogar y Más</h3>
          <p className="carousel-text">Encuentra todo lo que necesitas en un solo lugar</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Header;


