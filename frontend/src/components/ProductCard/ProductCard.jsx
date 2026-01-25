import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const ProductCard = ({ product, onOpenModal, addToCart, toggleFavorite, isFavorite }) => {
  return (
    <Card 
      className="h-100 border-0 shadow-sm card-hover" 
      style={{ cursor: 'pointer', transition: '0.3s' }}
      onClick={() => onOpenModal(product)}
    >
      <div className="bg-light text-center p-3 position-relative">
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          style={{ height: '180px', objectFit: 'cover' }} 
        />
        {/* Botón de favoritos opcional */}
        {toggleFavorite && (
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
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-baseline gap-2">
          <h5 className="fw-bold mb-0">${product.price.toLocaleString('es-CL')}</h5>
          {product.originalPrice && (
            <span className="text-muted text-decoration-line-through small">${product.originalPrice.toLocaleString('es-CL')}</span>
          )}
        </div>
        <Card.Title className="fs-6 mt-1 mb-1 fw-normal text-dark text-truncate">
          {product.name}
        </Card.Title>
        <Card.Text className="text-muted small mb-3">
          {product.brand || product.category}
        </Card.Text>
        
        <Button 
          variant="dark" 
          className="mt-auto w-100 rounded-1 py-2 fw-bold small"
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

export default ProductCard;
