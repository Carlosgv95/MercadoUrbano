import { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card, Container } from 'react-bootstrap';
import Loading from "../Loading/Loading";
import api from "../../services/api";
import Swal from "sweetalert2"; 


// Funciones de validación
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    email: "",
    password: ""
  });

  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validaciones
      if (!validateEmail(formData.email)) {
        setAuthError("El correo electrónico no es válido");
        setIsLoading(false);
        return;
      }
      if (!validatePassword(formData.password)) {
        setAuthError("La contraseña debe tener al menos 8 caracteres");
        setIsLoading(false);
        return;
      }

      // Enviar datos al backend
      const response = await api.post("/usuarios", formData);

      // 🔵 Swal.fire profesional
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada correctamente",
        confirmButtonText: "Continuar",
        customClass: {
          popup: "swal2-border-radius",
          confirmButton: "btn-confirm",
        },
        buttonsStyling: false,
      });

      setAuthError(null);
      console.log("Usuario registrado:", response.data);

      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.error("Error completo:", error);
      setAuthError(error.response?.data?.message || "Error al registrar el usuario");
    } finally {
      setIsLoading(false);
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

              {isLoading ? (
                <Loading message="Registrando usuario..." />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Ingrese su nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      placeholder="Ingrese su apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefono"
                      placeholder="Ingrese su teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      placeholder="Ingrese su dirección"
                      value={formData.direccion}
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
                      value={formData.email}
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
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                      Registrarme
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;

