import React, { useState, useMemo, useContext } from 'react';
import { Container, Row, Col, Form, Nav } from 'react-bootstrap';
import products from "../../Data/products";
import { CartContext } from "../../context/CartContext";
// Importamos los nuevos componentes
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';

const Productos = () => {
  const [productos] = useState(products);
  const [filtroMarca, setFiltroMarca] = useState('Todos');
  const [orden, setOrden] = useState('default');
  const [busqueda, setBusqueda] = useState('');
  
  // Estado para el Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  const handleOpenModal = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  const productosFiltrados = useMemo(() => {
    let res = [...productos];
    if (filtroMarca !== 'Todos') res = res.filter(p => p.brand === filtroMarca);
    if (busqueda.trim() !== '') {
      res = res.filter(p => 
        p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.brand.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    // Lógica de ordenamiento simplificada
    if (orden === 'precio-asc') res.sort((a, b) => a.price - b.price);
    else if (orden === 'precio-desc') res.sort((a, b) => b.price - a.price);
    else if (orden === 'alfa') res.sort((a, b) => a.name.localeCompare(b.name));
    return res;
  }, [productos, filtroMarca, orden, busqueda]);

  return (
    <Container fluid className="bg-light min-vh-100 py-4 px-lg-5">
      <Row>
        {/* --- COLUMNA DE FILTROS --- */}
        <Col md={3} lg={2} className="mb-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <h6 className="fw-bold mb-3 border-bottom pb-2">FILTRAR</h6>
            <Nav className="flex-column mb-3">
              {['Todos', 'Kitchen', 'Tools', 'Outdoor'].map(category => (
                <Nav.Link 
                  key={category}
                  onClick={() => setFiltroMarca(category)}
                  className={`py-1 px-0 small ${filtroMarca === category ? 'fw-bold text-primary' : 'text-muted'}`}
                >
                  {category}
                </Nav.Link>
              ))}
            </Nav>
            <Form.Control 
              type="text" 
              placeholder="Buscar..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="sm"
            />
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
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* MODAL REUTILIZABLE */}
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
