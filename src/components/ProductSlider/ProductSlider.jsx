import React from 'react';
import { Card, Button, Row, Col, Container, Carousel } from 'react-bootstrap';

// --- 1. DATOS DE EJEMPLO ---
// Usamos datos dummy para simular productos de una API o base de datos.
const products = [
  { id: 1, name: 'Zapatillas Superstar', price: '89.990', originalPrice: '99.990', brand: 'Originals', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Superstar' },
  { id: 2, name: 'Zapatillas Campus 00s', price: '99.990', originalPrice: null, brand: 'Originals', imageUrl: 'https://placehold.co/400x400/cccccc/333333?text=Campus+00s' },
  { id: 3, name: 'Zapatillas Handball Spezial', price: '99.990', originalPrice: '120.000', brand: 'Originals', imageUrl: 'https://placehold.co/400x400/dddddd/333333?text=Handball+Spezial' },
  { id: 4, name: 'Zapatillas Campus Grey', price: '99.990', originalPrice: null, brand: 'Originals', imageUrl: 'https://placehold.co/400x400/bbbbbb/333333?text=Campus+Grey' },
  // Añadimos más productos para llenar un segundo y tercer slide
  { id: 5, name: 'Zapatillas Cloudfoam', price: '59.990', originalPrice: '65.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/999999/ffffff?text=Cloudfoam' },
  { id: 6, name: 'Botines de Fútbol', price: '159.990', originalPrice: null, brand: 'Performance', imageUrl: 'https://placehold.co/400x400/888888/ffffff?text=Botines' },
  { id: 7, name: 'Mocasines Classic', price: '75.000', originalPrice: '85.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/aaaaaa/333333?text=Mocasines' },
  { id: 8, name: 'Tenis Running Pro', price: '110.000', originalPrice: null, brand: 'Performance', imageUrl: 'https://placehold.co/400x400/777777/ffffff?text=Running+Pro' },
  { id: 9, name: 'Sandalias Comfy', price: '35.000', originalPrice: '40.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/666666/ffffff?text=Sandalias' },
];

// --- FUNCION PARA DIVIDIR ARREGLO EN GRUPOS ---
// Divide el arreglo de productos en grupos de 'size' (e.g., grupos de 4) para los slides.
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

// --- 2. COMPONENTE DE TARJETA INDIVIDUAL (REUTILIZABLE) ---
const ProductCard = ({ product }) => {
  const handleCardClick = () => {
    console.log(`Navegando a la página del producto ID: ${product.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick} 
      className="product-card border-0 rounded-0 p-2 h-100"
      style={{ cursor: 'pointer', transition: 'box-shadow 0.3s' }}
    >
      {/* Contenedor de la Imagen y el Corazón */}
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          alt={product.name} 
          className="rounded-0"
        />
        {/* Botón de Wishlist/Corazón (SVG simple) */}
        <Button 
          variant="light" 
          className="rounded-circle p-2" 
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
          onClick={(e) => {
            e.stopPropagation(); 
            console.log(`Producto ${product.id} añadido a favoritos.`);
          }}
        >
          {/* SVG de Corazón */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C3.856 1.314 0 4.045 0 8c0 4.286 4.093 7.02 8 10.472 3.907-3.452 8-6.186 8-10.472 0-3.955-3.856-6.686-8-6.686z"/>
          </svg>
        </Button>
      </div>

      <Card.Body className="p-1 pt-3">
        {/* Sección de Precios */}
        <div className="d-flex align-items-center mb-1">
          <span className="fw-bold me-2" style={{ fontSize: '1.1em' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-muted text-decoration-line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Título del Producto */}
        <Card.Title className="mb-0 text-dark" style={{ fontSize: '0.95em' }}>
          {product.name}
        </Card.Title>

        {/* Marca/Descripción */}
        <Card.Text className="text-muted" style={{ fontSize: '0.85em' }}>
          {product.brand}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// --- 3. COMPONENTE CARRUSEL DE PRODUCTOS (SOLUCIÓN BASADA EN REACT-BOOTSTRAP) ---
const ProductSlider = ({ title }) => {
  // Número de tarjetas a mostrar por slide.
  const cardsPerSlide = 4;
  // Dividimos el arreglo de productos en grupos.
  const productSlides = chunkArray(products, cardsPerSlide);

  return (
    <Container className="my-5">
      {/* Título y Botón Ver Más (movido a la misma fila del título para mejor maquetación) */}
      <Row className="mb-3 align-items-center">
        <Col xs={6}>
          <h2 className="fw-bold">{title}</h2>
        </Col>
        <Col xs={6} className="text-end">
          <Button 
            variant="outline-dark" 
            className="rounded-0 px-4 py-1"
            onClick={() => console.log('Ver todos los productos')}
          >
            Ver más
          </Button>
        </Col>
      </Row>

      {/* Implementación del Carrusel de Bootstrap */}
      <Carousel 
        indicators={false} // Quitamos los indicadores de abajo
        interval={null}   // Desactivamos el auto-slide
        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon bg-dark p-3 rounded-circle" style={{opacity: 0.8}} />}
        prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon bg-dark p-3 rounded-circle" style={{opacity: 0.8}} />}
      >
        {productSlides.map((slide, index) => (
          // Cada Carousel.Item contiene un grupo (slide) de 4 productos
          <Carousel.Item key={index} className="p-2">
            <Row 
              // Usamos 4 columnas para desktop, 3 para tablet y 2 para móvil
              xs={2} 
              md={3} 
              lg={4} 
              className="g-4"
            >
              {slide.map(product => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      
    </Container>
  );
};

export default ProductSlider;