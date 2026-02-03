import React from 'react';
import { Modal, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ show, onHide, product, addToCart }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nombre,
      price: parseFloat(product.precio),
      quantity: 1
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/carrito'); // ✅ Redirige a Cart.jsx
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0"></Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Row className="align-items-center">
          {/* Imagen del producto */}
          <Col md={6} className="text-center bg-light rounded p-4">
            <Image
              src={product.imagen}
              fluid
              className="rounded"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </Col>

          {/* Información del producto */}
          <Col md={6} className="ps-lg-5 mt-4 mt-md-0">
            <Badge bg="secondary" className="mb-2">
              {product.categoria}
            </Badge>
            <h2 className="fw-bold mb-2">{product.nombre}</h2>
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="text-primary fw-bold mb-0">
                ${product.precio?.toLocaleString('es-CL', { minimumFractionDigits: 2 }) || '0.00'}
              </h3>
            </div>
            <p className="text-secondary small mb-4">{product.descripcion}</p>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" className="fw-bold" onClick={handleBuyNow}>
                Comprar ahora
              </Button>
              <Button variant="outline-dark" size="lg" onClick={handleAddToCart}>
                Agregar al carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
