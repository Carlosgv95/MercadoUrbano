import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

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
  );
};

export default Registro;
