import React, { useState } from 'react';
<<<<<<< HEAD
import { Card, Button, Row, Col, Container, Carousel, Modal, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// --- 1. DATOS DE EJEMPLO ---
const products = [
  { id: 1, name: 'Zapatillas Superstar', price: '89.990', originalPrice: '99.990', brand: 'Originals', description: 'Diseño clásico.', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Superstar' },
  { id: 2, name: 'Zapatillas Campus 00s', price: '99.990', originalPrice: null, brand: 'Originals', description: 'Estilo skate.', imageUrl: 'https://placehold.co/400x400/cccccc/333333?text=Campus+00s' },
  { id: 3, name: 'Zapatillas Handball Spezial', price: '99.990', originalPrice: '120.000', brand: 'Originals', description: 'Retro vibe.', imageUrl: 'https://placehold.co/400x400/dddddd/333333?text=Handball' },
  { id: 4, name: 'Zapatillas Campus Grey', price: '99.990', originalPrice: null, brand: 'Originals', description: 'Color gris.', imageUrl: 'https://placehold.co/400x400/bbbbbb/333333?text=Grey' },
  { id: 5, name: 'Zapatillas Cloudfoam', price: '59.990', originalPrice: '65.000', brand: 'Casual', description: 'Comodidad total.', imageUrl: 'https://placehold.co/400x400/999999/ffffff?text=Cloudfoam' },
  { id: 6, name: 'Botines de Fútbol', price: '159.990', originalPrice: null, brand: 'Performance', description: 'Para ganar.', imageUrl: 'https://placehold.co/400x400/888888/ffffff?text=Botines' },
  { id: 7, name: 'Mocasines Classic', price: '75.000', originalPrice: '85.000', brand: 'Casual', description: 'Formal.', imageUrl: 'https://placehold.co/400x400/aaaaaa/333333?text=Mocasines' },
  { id: 8, name: 'Tenis Running Pro', price: '110.000', originalPrice: null, brand: 'Performance', description: 'Corre más.', imageUrl: 'https://placehold.co/400x400/777777/ffffff?text=Running' },
];

=======
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
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

<<<<<<< HEAD
// --- COMPONENTE TARJETA ---
const ProductCard = ({ product, toggleFavorite, addToCart, isFavorite, onOpenModal }) => {
  return (
    <Card 
      className="border-0 shadow-sm h-100" 
      style={{ cursor: 'pointer' }}
      onClick={() => onOpenModal(product)}
    >
      <div className="position-relative">
        <Card.Img variant="top" src={product.imageUrl} className="rounded-0" />
        <Button
          variant="light"
          className="rounded-circle p-2 shadow-sm"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 5 }}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
        >
          <svg width="18" height="18" fill={isFavorite ? "red" : "gray"} viewBox="0 0 16 16">
            <path d="M8 1.314C3.856 1.314 0 4.045 0 8c0 4.286 4.093 7.02 8 10.472 3.907-3.452 8-6.186 8-10.472 0-3.955-3.856-6.686-8-6.686z"/>
          </svg>
        </Button>
      </div>
      <Card.Body className="p-2">
        <div className="fw-bold">${product.price}</div>
        <div className="text-truncate small text-muted">{product.name}</div>
        <Button 
          variant="dark" size="sm" className="w-100 mt-2 py-1 fw-bold" 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          Agregar
=======
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
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
        </Button>
      </Card.Body>
    </Card>
  );
};

// --- COMPONENTE SLIDER ---
const ProductSlider = ({ title }) => {
  const [favorites, setFavorites] = useState([]);
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (p) => { setSelectedProduct(p); setShowModal(true); };
  const toggleFavorite = (p) => {
    setFavorites(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  // Ajuste según tamaño de pantalla (puedes simplificarlo a 4 para escritorio)
=======
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

>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
  const cardsPerSlide = 4;
  const productSlides = chunkArray(products, cardsPerSlide);

  return (
<<<<<<< HEAD
    <Container className="my-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{title}</h2>
        <Button variant="outline-dark" size="sm" as={Link} to="/productos">Ver más</Button>
      </div>

      {/* Importante: variant="dark" para que las flechas se vean en fondo claro */}
      <Carousel indicators={false} interval={null} variant="dark" className="px-5">
        {productSlides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <Row className="mx-0">
              {slide.map((product) => (
                <Col key={product.id} xs={6} md={3} className="px-2">
                  <ProductCard
                    product={product}
                    toggleFavorite={toggleFavorite}
                    addToCart={(p) => console.log("Agregado", p)}
                    isFavorite={favorites.some(f => f.id === product.id)}
                    onOpenModal={handleOpenModal}
=======
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
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

<<<<<<< HEAD
      {/* MODAL (Igual que antes) */}
      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0" />
          <Modal.Body className="p-4">
            <Row className="align-items-center">
              <Col md={6} className="bg-light p-3 text-center"><Image src={selectedProduct.imageUrl} fluid /></Col>
              <Col md={6}>
                <Badge bg="dark">{selectedProduct.brand}</Badge>
                <h3 className="fw-bold mt-2">{selectedProduct.name}</h3>
                <h4 className="text-primary">${selectedProduct.price}</h4>
                <p className="text-muted small">{selectedProduct.description}</p>
                <div className="d-grid gap-2">
                    <Button variant="primary">Comprar Ahora</Button>
                    <Button variant="outline-dark">Añadir al Carro</Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}

      {/* CSS para corregir flechas que no se ven */}
      <style>{`
        .carousel-control-prev, .carousel-control-next {
          width: 5%;
          filter: invert(100%);
        }
        .carousel-item {
          transition: transform 0.6s ease-in-out;
        }
      `}</style>
=======
      {/* Mostrar favoritos y carrito en consola */}
      <div className="mt-4">
        <h5>Favoritos: {favorites.length}</h5>
        <h5>Carrito: {cart.reduce((acc, p) => acc + p.quantity, 0)} items</h5>
      </div>
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
    </Container>
  );
};

export default ProductSlider;