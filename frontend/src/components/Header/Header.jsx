import Carousel from 'react-bootstrap/Carousel';

const ofertaImage = 'https://placehold.co/1200x400/3c7849/ffffff?text=50%25+OFF+EN+TODO'; 
const logoImage = '/logo.png'; // Ruta al logo de la empresa

const Header =()=> {
  return (
    
    <Carousel fade>
      
      
      <Carousel.Item>
       
        <img
  className="d-block w-100 carousel-image"
  src={logoImage}
  alt="First slide: Oferta Flash"
/>

        <Carousel.Caption>
          <h3>OFERTA FLASH</h3>
          <p>¡50% de descuento en todos los artículos!</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      
      <Carousel.Item>
        <img
  className="d-block w-100 carousel-image"
  src={ofertaImage}
  alt="Second slide: Descuentos Exclusivos"
/>

        <Carousel.Caption>
          <h3>Descuentos Exclusivos</h3>
          <p>Válido solo por tiempo limitado.</p>
        </Carousel.Caption>
      </Carousel.Item>

      
      <Carousel.Item>
        <img
  className="d-block w-100 carousel-image"
  src={ofertaImage}
  alt="Third slide: Tienda Online"
/>

        <Carousel.Caption>
          <h3>Toda la Tienda</h3>
          <p>
            Aprovecha nuestros precios reducidos en cocina, herramientas y más.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default Header;
