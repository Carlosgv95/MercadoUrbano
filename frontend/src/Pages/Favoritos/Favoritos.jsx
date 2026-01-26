import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CartContext } from '../../context/CartContext';
import api from '../../services/api';

const Favoritos = () => {
  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // ✅ Redirige si no hay sesión
  useEffect(() => {
    if (!user) {
      navigate('/ingreso');
    } else {
      fetchFavoritos();
    }
  }, [user, navigate]);

  // ✅ Obtener favoritos desde la API
  const fetchFavoritos = async () => {
    try {
      const response = await api.get(`/favoritos/${user.id}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    }
  };

  // ✅ Eliminar favorito
  const handleRemoveFavorite = async (product) => {
    try {
      await api.delete('/favoritos', {
        data: { usuario_id: user.id, producto_id: product.id }
      });
      // Actualizar lista
      setFavorites(prev => prev.filter(fav => fav.id !== product.id));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <Alert variant="info">No tienes productos en favoritos.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favorites.map((product) => (
            <Col key={product.id}>
              <ProductCard
                product={product}
                onOpenModal={() => {}}
                addToCart={addToCart}
                isFavorite={true}
              />
              {/* Botón para eliminar favorito */}
              <div className="text-center mt-2">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveFavorite(product)}
                >
                  Eliminar de favoritos
                </button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favoritos;

