import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Row, Col, Form, Nav } from 'react-bootstrap';
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import api from '../../services/api';
import './Productos.css';

// Componentes
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import './Productos.css'; // estilos mejorados

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('Todos');
  const [orden, setOrden] = useState('default');
  const [busqueda, setBusqueda] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  // ✅ Obtener productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        const normalizados = response.data.map(p => ({
          ...p,
          nombre: p.nombre ?? "",
          categoria: p.categoria ?? "",
          precio: p.precio ?? 0
        }));
        setProductos(normalizados);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  // ✅ Obtener favoritos del usuario
  const fetchFavoritos = async () => {
    if (user) {
      try {
        const response = await api.get(`/favoritos/${user.id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, [user]);

  const handleOpenModal = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  // 🔥 Categorías dinámicas
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria || ""))];

  // 🔥 Filtros + búsqueda + ordenamiento
  const productosFiltrados = useMemo(() => {
    let res = [...productos];

    if (filtroMarca !== 'Todos') {
      res = res.filter(p => p.categoria === filtroMarca);
    }

    if (busqueda.trim() !== '') {
      const busquedaLower = busqueda.toLowerCase();
      res = res.filter(p =>
        (p.nombre ?? "").toLowerCase().includes(busquedaLower) ||
        (p.categoria ?? "").toLowerCase().includes(busquedaLower)
      );
    }

    if (orden === 'precio-asc') res.sort((a, b) => a.precio - b.precio);
    else if (orden === 'precio-desc') res.sort((a, b) => b.precio - a.precio);
    else if (orden === 'alfa') res.sort((a, b) => (a.nombre ?? "").localeCompare(b.nombre ?? ""));

    return res;
  }, [productos, filtroMarca, orden, busqueda]);

  return (
    <Container fluid className="bg-light min-vh-100 py-4 px-lg-5">
      <Row>
        {/* --- FILTROS --- */}
        <Col md={3} lg={2} className="mb-4">
          <div className="filters-card shadow-sm rounded-3 p-3">
            <h6 className="filters-title mb-3">🔍 Filtrar productos</h6>

            {/* Categorías */}
            <div className="filters-section mb-4">
              <h6 className="filters-subtitle">Categorías</h6>
              <Nav className="flex-column">
                {categorias.map(category => (
                  <Nav.Link
                    key={category}
                    onClick={() => setFiltroMarca(category)}
                    className={`filter-link ${filtroMarca === category ? 'active' : ''}`}
                  >
                    {category}
                  </Nav.Link>
                ))}
              </Nav>
            </div>

            {/* Búsqueda */}
            <div className="filters-section mb-4">
              <h6 className="filters-subtitle">Buscar</h6>
              <Form.Control
                type="text"
                placeholder="Escribe el nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Ordenamiento */}
            <div className="filters-section">
              <h6 className="filters-subtitle">Ordenar por</h6>
              <Form.Select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="filter-select"
              >
                <option value="default">Relevancia</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="alfa">Nombre (A-Z)</option>
              </Form.Select>
            </div>
          </div>
        </Col>

        {/* --- GRID DE PRODUCTOS --- */}
        <Col md={9} lg={10}>
          <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
            {productosFiltrados.map((prod) => (
              <Col key={prod.id}>
                <ProductCard
                  product={prod}
                  onOpenModal={handleOpenModal}
                  addToCart={addToCart}
                  isFavorite={favorites.some(f => f.id === prod.id)}
                  onFavoriteChange={fetchFavoritos}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* --- MODAL --- */}
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </Container>
  );
};

export default Productos;

