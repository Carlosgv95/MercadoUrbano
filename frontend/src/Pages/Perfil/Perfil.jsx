import { Container, Row, Col, Nav, Form, Button, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Perfil = () => {
  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ minHeight: '90vh' }}>
        
        
        <Col md={3} lg={2} className="bg-white border-end p-4">
          <h4 className="text-primary fw-bold mb-4">MI PERFIL</h4>
          <Nav className="flex-column gap-3">
            <Nav.Link as={Link} to="/mis-productos" className="text-dark d-flex align-items-center">
              🎲 <span className="ms-2">Mis Productos</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/favoritos" className="text-dark d-flex align-items-center">
              ❤️ <span className="ms-2">Mis Favoritos</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/crear-publicacion" className="text-dark d-flex align-items-center">
              🏪 <span className="ms-2">Crear Publicacion</span>
            </Nav.Link>
          </Nav>
        </Col>

        
        <Col md={9} lg={10} className="bg-light p-5">
          <Card className="border-0 shadow-sm p-4">
            
            
            <div className="d-flex align-items-center justify-content-between mb-5">
              <div className="d-flex gap-2">
                <Button variant="primary" size="sm">Subir Foto</Button>
                <Button variant="danger" size="sm">Eliminar Foto</Button>
              </div>
              <Image 
                src="https://via.placeholder.com/100" 
                roundedCircle 
                style={{ width: '80px', height: '80px', border: '2px solid #6f42c1' }} 
              />
            </div>

          
            <Form>
              <Row className="mb-4">
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Juan" className="bg-light border-0" />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Perez" className="bg-light border-0" />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Teléfono</Form.Label>
                  <Form.Control type="text" placeholder="123456789" className="bg-light border-0" />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Dirección</Form.Label>
                  <Form.Control type="text" placeholder="Calle falsa 123" className="bg-light border-0" />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Email</Form.Label>
                  <Form.Control type="email" placeholder="juan@correo.com" className="bg-light border-0" />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label className="text-muted small">Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="********" className="bg-light border-0" />
                </Form.Group>
              </Row>

              {/* Botones de Acción */}
              <div className="d-flex flex-column align-items-center gap-3 mt-4">
                <Button variant="primary" className="px-5 py-2 w-35">Guardar Cambios</Button>
                <Button variant="primary" className="px-5 py-2 w-35">Cerrar Sesion</Button>
                <Button variant="danger" className="px-5 py-2 w-30">Eliminar cuenta</Button>
              </div>
            </Form>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;