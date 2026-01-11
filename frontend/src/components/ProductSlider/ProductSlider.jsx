import React, { useState } from 'react';
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

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

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
        </Button>
      </Card.Body>
    </Card>
  );
};

// --- COMPONENTE SLIDER ---
const ProductSlider = ({ title }) => {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (p) => { setSelectedProduct(p); setShowModal(true); };
  const toggleFavorite = (p) => {
    setFavorites(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  // Ajuste según tamaño de pantalla (puedes simplificarlo a 4 para escritorio)
  const cardsPerSlide = 4;
  const productSlides = chunkArray(products, cardsPerSlide);

  return (
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
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

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
    </Container>
  );
};

export default ProductSlider;