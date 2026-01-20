import { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card, Container } from 'react-bootstrap';

const Registro = () => {
  const [formData, setFormData] = useState({});
  const [authError, setAuthError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Recuperar usuarios previos del localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Agregar el nuevo usuario
      usuarios.push(formData);

      // Guardar nuevamente en localStorage como JSON
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("✅ Registro exitoso 🚀");
      setAuthError(null);
    } catch (error) {
      setAuthError("Error al guardar el usuario");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Registro de Usuario</h2>

              {authError && (
                <Alert variant="danger" className="text-center">
                  {authError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Registrarme
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

export default Registro;

