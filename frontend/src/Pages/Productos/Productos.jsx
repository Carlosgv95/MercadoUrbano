import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Nav, 
  Modal, 
  Image, 
  Badge 
} from 'react-bootstrap';

const Productos = () => {
  // 1. ESTADO DE DATOS (Simulando base de datos)
  const [productos] = useState([
    { id: 1, name: 'Zapatillas Superstar', price: '89.990', originalPrice: '99.990', brand: 'Originals', category: 'Calzado', description: 'El estilo clásico de las canchas de baloncesto de los 70. Un icono de la moda urbana.', imageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Superstar' },
    { id: 2, name: 'Zapatillas Campus 00s', price: '99.990', originalPrice: null, brand: 'Originals', category: 'Calzado', description: 'Inspiradas en el skate de los 2000, con proporciones audaces y materiales premium.', imageUrl: 'https://placehold.co/400x400/cccccc/333333?text=Campus+00s' },
    { id: 3, name: 'Zapatillas Handball Spezial', price: '99.990', originalPrice: '120.000', brand: 'Originals', category: 'Calzado', description: 'Lanzadas originalmente en 1979 para jugadores de balonmano, ahora un clásico de culto.', imageUrl: 'https://placehold.co/400x400/dddddd/333333?text=Handball+Spezial' },
    { id: 4, name: 'Zapatillas Campus Grey', price: '99.990', originalPrice: null, brand: 'Originals', category: 'Calzado', description: 'Versatilidad en color gris con la comodidad de siempre.', imageUrl: 'https://placehold.co/400x400/bbbbbb/333333?text=Campus+Grey' },
    { id: 5, name: 'Zapatillas Cloudfoam', price: '59.990', originalPrice: '65.000', brand: 'Casual', category: 'Deporte', description: 'Amortiguación superior para el día a día.', imageUrl: 'https://placehold.co/400x400/999999/ffffff?text=Cloudfoam' },
    { id: 6, name: 'Botines de Fútbol', price: '159.990', originalPrice: null, brand: 'Performance', category: 'Deporte', description: 'Tracción máxima para jugadores de alto rendimiento.', imageUrl: 'https://placehold.co/400x400/888888/ffffff?text=Botines' },
    { id: 7, name: 'Mocasines Classic', price: '75.000', originalPrice: '85.000', brand: 'Casual', category: 'Vestir', description: 'Elegancia y confort en cuero sintético de alta calidad.', imageUrl: 'https://placehold.co/400x400/aaaaaa/333333?text=Mocasines' },
    { id: 8, name: 'Tenis Running Pro', price: '110.000', originalPrice: null, brand: 'Performance', category: 'Deporte', description: 'Diseñados para largas distancias y protección articular.', imageUrl: 'https://placehold.co/400x400/777777/ffffff?text=Running+Pro' },
    { id: 9, name: 'Sandalias Comfy', price: '35.000', originalPrice: '40.000', brand: 'Casual', category: 'Verano', description: 'Frescura y ligereza para tus vacaciones.', imageUrl: 'https://placehold.co/400x400/666666/ffffff?text=Sandalias' },
  ]);

  // 2. ESTADOS DE FILTRO Y MODAL
  const [filtroMarca, setFiltroMarca] = useState('Todos');
  const [orden, setOrden] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 3. LÓGICA DE FILTRADO (useMemo para rendimiento)
  const limpiarPrecio = (str) => Number(str.replace(/\./g, ''));

  const productosFiltrados = useMemo(() => {
    let res = [...productos];
    if (filtroMarca !== 'Todos') res = res.filter(p => p.brand === filtroMarca);

    if (orden === 'precio-asc') res.sort((a, b) => limpiarPrecio(a.price) - limpiarPrecio(b.price));
    else if (orden === 'precio-desc') res.sort((a, b) => limpiarPrecio(b.price) - limpiarPrecio(a.price));
    else if (orden === 'alfa') res.sort((a, b) => a.name.localeCompare(b.name));

    return res;
  }, [productos, filtroMarca, orden]);

  // 4. MANEJADORES DEL MODAL
  const handleOpenModal = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4 px-lg-5">
      <Row>
        {/* --- COLUMNA IZQUIERDA: SIDEBAR --- */}
        <Col md={3} lg={2} className="mb-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <h6 className="fw-bold mb-3 border-bottom pb-2">FILTRAR POR MARCA</h6>
            <Nav className="flex-column mb-4">
              {['Todos', 'Originals', 'Casual', 'Performance'].map(marca => (
                <Nav.Link 
                  key={marca}
                  onClick={() => setFiltroMarca(marca)}
                  className={`py-1 px-0 small ${filtroMarca === marca ? 'fw-bold text-primary' : 'text-muted'}`}
                >
                  {marca}
                </Nav.Link>
              ))}
            </Nav>

            <h6 className="fw-bold mb-3 border-bottom pb-2">ORDENAR</h6>
            <Form.Select size="sm" onChange={(e) => setOrden(e.target.value)}>
              <option value="default">Relevancia</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="alfa">Nombre A-Z</option>
            </Form.Select>
          </div>
        </Col>

        {/* --- COLUMNA DERECHA: GRILLA DE CARDS --- */}
        <Col md={9} lg={10}>
          <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
            {productosFiltrados.map((prod) => (
              <Col key={prod.id}>
                <Card 
                  className="h-100 border-0 shadow-sm card-hover" 
                  style={{ cursor: 'pointer', transition: '0.3s' }}
                  onClick={() => handleOpenModal(prod)}
                >
                  <div className="bg-light text-center p-3 position-relative">
                    <Card.Img 
                      variant="top" 
                      src={prod.imageUrl} 
                      style={{ mixBlendMode: 'multiply', height: '180px', objectFit: 'contain' }} 
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                       <Badge bg="white" text="dark" className="rounded-circle shadow-sm">●</Badge>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-baseline gap-2">
                      <h5 className="fw-bold mb-0">${prod.price}</h5>
                      {prod.originalPrice && (
                        <span className="text-muted text-decoration-line-through x-small">${prod.originalPrice}</span>
                      )}
                    </div>
                    <Card.Title className="fs-6 mt-1 mb-1 fw-normal text-dark text-truncate">
                      {prod.name}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-3">
                      {prod.brand}
                    </Card.Text>
                    <Button 
                      variant="dark" 
                      className="mt-auto w-100 rounded-1 py-2 fw-bold small"
                      onClick={(e) => { e.stopPropagation(); alert("Agregado al carro"); }}
                    >
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* --- MODAL DE DETALLE --- */}
      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body className="px-4 pb-4">
            <Row className="align-items-center">
              <Col md={6} className="text-center bg-light rounded p-4">
                <Image src={selectedProduct.imageUrl} fluid className="rounded" style={{ maxHeight: '400px' }} />
              </Col>
              <Col md={6} className="ps-lg-5 mt-4 mt-md-0">
                <Badge bg="secondary" className="mb-2">{selectedProduct.brand}</Badge>
                <h2 className="fw-bold mb-2">{selectedProduct.name}</h2>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <h3 className="text-primary fw-bold mb-0">${selectedProduct.price}</h3>
                  {selectedProduct.originalPrice && (
                    <span className="text-muted text-decoration-line-through">${selectedProduct.originalPrice}</span>
                  )}
                </div>
                <p className="text-secondary small mb-4">
                  {selectedProduct.description}
                </p>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" className="fw-bold">Comprar ahora</Button>
                  <Button variant="outline-dark" size="lg">Agregar al carrito</Button>
                  <Button variant="link" className="text-danger text-decoration-none mt-2">
                    ❤️ Agregar a Favoritos
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Productos;