
import React from 'react';
import { Modal, Row, Col, Image, Badge, Button } from 'react-bootstrap';

const ProductModal = ({ show, onHide, product, addToCart }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0"></Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Row className="align-items-center">
          {/* Imagen del producto */}
          <Col md={6} className="text-center bg-light rounded p-4">
            <Image
              src={product.imagen} // ✅ Cambiado a imagen
              fluid
              className="rounded"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </Col>

          {/* Información del producto */}
          <Col md={6} className="ps-lg-5 mt-4 mt-md-0">
            <Badge bg="secondary" className="mb-2">
              {product.categoria} {/* ✅ Cambiado a categoria */}
            </Badge>
            <h2 className="fw-bold mb-2">{product.nombre}</h2> {/* ✅ Cambiado a nombre */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="text-primary fw-bold mb-0">
                ${product.precio?.toLocaleString('es-CL', { minimumFractionDigits: 2 }) || '0.00'}
              </h3>
            </div>
            <p className="text-secondary small mb-4">{product.descripcion}</p> {/* ✅ Cambiado a descripcion */}
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" className="fw-bold">
                Comprar ahora
              </Button>
              <Button
                variant="outline-dark"
                size="lg"
                onClick={() => addToCart(product)}
              >
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
