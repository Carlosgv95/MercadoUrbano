import Carousel from 'react-bootstrap/Carousel';
// CORRECCIÓN: Se sustituye la importación del archivo local ('./img/oferta.png') 
// por una URL pública para evitar errores de resolución del sistema de archivos.
// Esta URL temporal muestra un placeholder que indica 50% OFF.
const ofertaImage = 'https://placehold.co/1200x400/3c7849/ffffff?text=50%25+OFF+EN+TODO'; 

const Header =()=> {
  return (
    // Componente principal de Carousel con efecto fade
    <Carousel fade>
      
      {/* Diapositiva 1 */}
      <Carousel.Item>
        {/* Usamos la etiqueta <img> para renderizar la imagen */}
        <img
          className="d-block w-100" // Clases de Bootstrap para que ocupe todo el ancho
          src={ofertaImage} 
          alt="First slide: Oferta Flash"
        />
        <Carousel.Caption>
          <h3>OFERTA FLASH</h3>
          <p>¡50% de descuento en todos los artículos!</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      {/* Diapositiva 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ofertaImage} 
          alt="Second slide: Descuentos Exclusivos"
        />
        <Carousel.Caption>
          <h3>Descuentos Exclusivos</h3>
          <p>Válido solo por tiempo limitado.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositiva 3 (Completada) */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ofertaImage} 
          alt="Third slide: Tienda Online"
        />
        <Carousel.Caption>
          <h3>Toda la Tienda</h3>
          <p>
            Aprovecha nuestros precios reducidos en electrónica, ropa y más.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default Header;
