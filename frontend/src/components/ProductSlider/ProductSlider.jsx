import React, { useState, useContext } from 'react';
import { Card, Button, Row, Col, Container, Carousel, Modal, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import products from "../../Data/products";

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
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          className="rounded-0 product-image" 
        />
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
        <div className="fw-bold">${product.price.toLocaleString('es-CL')}</div>
        <div className="text-truncate small text-muted">{product.name}</div>
        <Button 
          variant="dark" 
          size="sm" 
          className="w-100 mt-2 py-1 fw-bold" 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
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
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  const handleOpenModal = (p) => { setSelectedProduct(p); setShowModal(true); };
  const toggleFavorite = (p) => {
    setFavorites(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  const cardsPerSlide = 4;
  const productSlides = chunkArray(products, cardsPerSlide);

  return (
    <Container className="my-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{title}</h2>
        <Button variant="outline-dark" size="sm" as={Link} to="/productos">Ver más</Button>
      </div>

      <Carousel indicators={false} interval={null} variant="dark" className="px-5">
        {productSlides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <Row className="mx-0">
              {slide.map((product) => (
                <Col key={product.id} xs={6} md={3} className="px-2">
                  <ProductCard
                    product={product}
                    toggleFavorite={toggleFavorite}
                    addToCart={addToCart}
                    isFavorite={favorites.some(f => f.id === product.id)}
                    onOpenModal={handleOpenModal}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0" />
          <Modal.Body className="p-4">
            <Row className="align-items-center">
              <Col md={6} className="bg-light p-3 text-center">
                <Image src={selectedProduct.imageUrl} fluid className="modal-image" />
              </Col>
              <Col md={6}>
                <Badge bg="dark">{selectedProduct.category}</Badge>
                <h3 className="fw-bold mt-2">{selectedProduct.name}</h3>
                <h4 className="text-primary">${selectedProduct.price.toLocaleString('es-CL')}</h4>
                <p className="text-muted small">{selectedProduct.description}</p>
                <div className="d-grid gap-2">
                  <Button variant="primary">Comprar Ahora</Button>
                  <Button variant="outline-dark" onClick={() => addToCart(selectedProduct)}>
                    Añadir al Carro
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}

      <style>{`
        .carousel-control-prev, .carousel-control-next {
          width: 5%;
          filter: invert(100%);
        }
        .carousel-item {
          transition: transform 0.6s ease-in-out;
        }
        .product-image {
          height: 200px;       
          width: 100%;         
          object-fit: cover;   
        }
        .modal-image {
          max-height: 400px;   
          width: auto;
          object-fit: contain;
        }
      `}</style>
    </Container>
  );
};

export default ProductSlider;


