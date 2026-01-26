
import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import api from '../../services/api';

const ProductCard = ({ product, onOpenModal, addToCart, isFavorite, onFavoriteChange }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // ✅ Lógica para gestionar favoritos
  const handleFavorite = async (e) => {
    e.stopPropagation(); // Evita abrir el modal
    if (!user) {
      navigate('/ingreso'); // Redirige si no hay sesión
      return;
    }
    try {
      if (isFavorite) {
        // Eliminar de favoritos
        await api.delete('/favoritos', {
          data: { usuario_id: user.id, producto_id: product.id }
        });
      } else {
        // Añadir a favoritos
        await api.post('/favoritos', {
          usuario_id: user.id,
          producto_id: product.id
        });
      }
      // ✅ Actualizar favoritos en la vista
      if (onFavoriteChange) onFavoriteChange();
    } catch (error) {
      console.error('Error al gestionar favorito:', error);
    }
  };

  return (
    <Card
      className="h-100 border-0 shadow-sm card-hover"
      style={{ cursor: 'pointer', transition: '0.3s' }}
      onClick={() => onOpenModal(product)}
    >
      <div className="bg-light text-center p-3 position-relative">
        <Card.Img
          variant="top"
          src={product.imagen} // ✅ Adaptado para datos del backend
          style={{ height: '180px', objectFit: 'cover' }}
        />
        {/* ❤️ Botón de favoritos */}
        <Button
          variant="light"
          className="rounded-circle p-2 shadow-sm"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 5 }}
          onClick={handleFavorite}
        >
          <span style={{ fontSize: '18px' }}>{isFavorite ? '❤️' : '🤍'}</span>
        </Button>
      </div>

      <Card.Body className="d-flex flex-column">
        <h5 className="fw-bold mb-0">
          ${product.precio?.toLocaleString('es-CL', { minimumFractionDigits: 2 }) || '0.00'}
        </h5>
        <Card.Title className="fs-6 mt-1 mb-1 fw-normal text-dark text-truncate">
          {product.nombre}
        </Card.Title>
        <Card.Text className="text-muted small mb-3">{product.categoria}</Card.Text>

        {/* ✅ Botón para agregar al carrito con datos normalizados */}
        <Button
          variant="dark"
          className="mt-auto w-100 rounded-1 py-2 fw-bold small"
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: product.id,
              name: product.nombre,   // ✅ Normalizamos nombre
              price: product.precio,  // ✅ Normalizamos precio
              quantity: 1
            });
          }}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;





