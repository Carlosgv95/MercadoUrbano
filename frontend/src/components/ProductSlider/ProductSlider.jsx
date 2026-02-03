import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import api from '../../services/api';

// Componentes
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const ProductSlider = ({ title }) => {
  const [productos, setProductos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenModal = (p) => {
    setSelectedProduct(p);
    setShowModal(true);
  };

  const toggleFavorite = (p) => {
    setFavorites(prev =>
      prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]
    );
  };

  const productSlides = isMobile
    ? productos.map(p => [p]) // una card por slide en móvil
    : chunkArray(productos, 4); // 4 cards por slide en desktop

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{title}</h2>
        <Button variant="outline-dark" size="sm" as={Link} to="/productos">Ver todos</Button>
      </div>

      <Carousel indicators={false} interval={null} variant="dark" className="px-5" touch={true}>
        {productSlides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <Row className="justify-content-center">
              {slide.map((product) => (
                <Col key={product.id} xs={12} md={3} className="px-2">
                  <ProductCard
                    product={product}
                    onOpenModal={handleOpenModal}
                    addToCart={addToCart}
                    isFavorite={favorites.some(f => f.id === product.id)}
                    onFavoriteChange={() => toggleFavorite(product)}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
        addToCart={addToCart}
      />

      <style>{`
        .carousel-control-prev, .carousel-control-next { filter: invert(100%); width: 5%; }
      `}</style>
    </Container>
  );
};

export default ProductSlider;

