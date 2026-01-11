import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
<<<<<<< HEAD
// Importa Container, Row y Col
import { Form, Button, Row, Col, Alert, Card, Container } from 'react-bootstrap';
=======
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85

const Registro = () => {
  const [formData, setFormData] = useState({});
  const { register, authError } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      alert('✅ Registro exitoso 🚀');
    }
  };

  return (
<<<<<<< HEAD
    // 1. El Container ocupa el 100% del alto de la pantalla (vh-100)
    // 2. Usamos Flexbox para centrar (d-flex, align-items-center, justify-content-center)
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        {/* 3. Definimos el ancho del formulario según el dispositivo (md="6" o lg="4") */}
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
=======
    <Card className="shadow-lg p-4 mt-4">
      <Card.Body>
        <h2 className="text-center mb-4">Registro de Usuario</h2>

        {authError && (
          <Alert variant="danger" className="text-center">
            {authError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Ingrese su apellido"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
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

            <Form.Group as={Col} md="6">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                placeholder="Ingrese su ciudad"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Región</Form.Label>
            <Form.Control
              type="text"
              name="region"
              placeholder="Ingrese su región"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="px-4">
              Registrarme
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
>>>>>>> 20da3235139a8979e72a842cb361e16202e47a85
  );
};

export default Registro;
