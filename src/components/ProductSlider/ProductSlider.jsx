import React, { useState } from 'react';
import { Card, Button, Row, Col, Container, Carousel } from 'react-bootstrap';

// --- 1. DATOS DE EJEMPLO ---
const products = [
  { id: 1, name: 'Zapatillas Superstar', price: '89.990', originalPrice: '99.990', brand: 'Originals', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Superstar' },
  { id: 2, name: 'Zapatillas Campus 00s', price: '99.990', originalPrice: null, brand: 'Originals', imageUrl: 'https://placehold.co/400x400/cccccc/333333?text=Campus+00s' },
  { id: 3, name: 'Zapatillas Handball Spezial', price: '99.990', originalPrice: '120.000', brand: 'Originals', imageUrl: 'https://placehold.co/400x400/dddddd/333333?text=Handball+Spezial' },
  { id: 4, name: 'Zapatillas Campus Grey', price: '99.990', originalPrice: null, brand: 'Originals', imageUrl: 'https://placehold.co/400x400/bbbbbb/333333?text=Campus+Grey' },
  { id: 5, name: 'Zapatillas Cloudfoam', price: '59.990', originalPrice: '65.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/999999/ffffff?text=Cloudfoam' },
  { id: 6, name: 'Botines de Fútbol', price: '159.990', originalPrice: null, brand: 'Performance', imageUrl: 'https://placehold.co/400x400/888888/ffffff?text=Botines' },
  { id: 7, name: 'Mocasines Classic', price: '75.000', originalPrice: '85.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/aaaaaa/333333?text=Mocasines' },
  { id: 8, name: 'Tenis Running Pro', price: '110.000', originalPrice: null, brand: 'Performance', imageUrl: 'https://placehold.co/400x400/777777/ffffff?text=Running+Pro' },
  { id: 9, name: 'Sandalias Comfy', price: '35.000', originalPrice: '40.000', brand: 'Casual', imageUrl: 'https://placehold.co/400x400/666666/ffffff?text=Sandalias' },
];

// --- FUNCION PARA DIVIDIR ARREGLO EN GRUPOS ---
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

// --- COMPONENTE DE TARJETA ---
const ProductCard = ({ product, toggleFavorite, addToCart, isFavorite }) => {
  return (
    <Card className="product-card border-0 rounded-0 p-2 h-100" style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="rounded-0" />

        {/* Botón de Favoritos */}
        <Button
          variant="light"
          className="rounded-circle p-2"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={isFavorite ? "red" : "black"} className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C3.856 1.314 0 4.045 0 8c0 4.286 4.093 7.02 8 10.472 3.907-3.452 8-6.186 8-10.472 0-3.955-3.856-6.686-8-6.686z"/>
          </svg>
        </Button>
      </div>

      <Card.Body className="p-1 pt-3">
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

        <Card.Title className="mb-0 text-dark" style={{ fontSize: '0.95em' }}>
          {product.name}
        </Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: '0.85em' }}>
          {product.brand}
        </Card.Text>

        {/* Botón de Carrito */}
        <Button
          variant="dark"
          size="sm"
          className="mt-2 w-100"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

// --- COMPONENTE SLIDER ---
const ProductSlider = ({ title }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleFavorite = (product) => {
    setFavorites((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    console.log("Carrito:", cart);
  };

  const cardsPerSlide = 4;
  const productSlides = chunkArray(products, cardsPerSlide);

  return (
    <Container className="my-5">
      <Row className="mb-3 align-items-center">
        <Col xs={6}>
          <h2 className="fw-bold">{title}</h2>
        </Col>
        <Col xs={6} className="text-end">
          <Button variant="outline-dark" className="rounded-0 px-4 py-1">
            Ver más
          </Button>
        </Col>
      </Row>

      <Carousel indicators={false} interval={null}>
        {productSlides.map((slide, index) => (
          <Carousel.Item key={index} className="p-2">
            <Row xs={2} md={3} lg={4} className="g-4">
              {slide.map((product) => (
                <Col key={product.id}>
                  <ProductCard
                    product={product}
                    toggleFavorite={toggleFavorite}
                    addToCart={addToCart}
                    isFavorite={favorites.some((p) => p.id === product.id)}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Mostrar favoritos y carrito en consola */}
      <div className="mt-4">
        <h5>Favoritos: {favorites.length}</h5>
        <h5>Carrito: {cart.reduce((acc, p) => acc + p.quantity, 0)} items</h5>
      </div>
    </Container>
  );
};

export default ProductSlider;