import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Asumiendo tu ruta de contexto
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CrearPublicacion = () => {
  const { user } = useContext(UserContext); // Obtenemos el usuario del contexto
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    description: '',
    imageUrl: ''
  });

  // Redirección si no hay sesión (Protección de ruta)
  /*if (!user) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-5 shadow-sm">
          <h3>Oops! Debes iniciar sesión</h3>
          <p>Solo los usuarios registrados pueden vender productos.</p>
          <Button onClick={() => navigate('/login')}>Ir al Login</Button>
        </Card>
      </Container>
    );
  } */

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto enviado a la base de datos:", producto);
    alert("✅ ¡Producto publicado con éxito!");
    navigate('/'); // Redirigir al catálogo tras publicar
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-4">¿Qué vas a publicar? 🚀</h2>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md={12} className="mb-3">
                    <Form.Label className="small fw-bold">Título de la publicación</Form.Label>
                    <Form.Control 
                      name="name"
                      placeholder="Ej: Zapatillas Adidas Superstar" 
                      onChange={handleChange}
                      required 
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className="small fw-bold">Precio</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control 
                        name="price"
                        type="number"
                        placeholder="0.000" 
                        onChange={handleChange}
                        required 
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label className="small fw-bold">Marca</Form.Label>
                    <Form.Control 
                      name="brand"
                      placeholder="Ej: Originals" 
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={12} className="mb-3">
                    <Form.Label className="small fw-bold">URL de la imagen</Form.Label>
                    <Form.Control 
                      name="imageUrl"
                      placeholder="https://enlace-de-tu-foto.jpg" 
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">Por ahora usaremos un link directo a la imagen.</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold">Descripción detallada</Form.Label>
                    <Form.Control 
                      name="description"
                      as="textarea" 
                      rows={4} 
                      placeholder="Describe el estado, material y detalles de tu producto..." 
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg" className="fw-bold">
                    Publicar Producto
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPublicacion;