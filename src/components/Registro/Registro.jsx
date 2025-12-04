import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Registro = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
      <h2 className="mb-4 text-center">Registro de Usuario</h2>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese su nombre"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese su apellido"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su apellido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="ejemplo@correo.com"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese un correo electrónico válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationUsuario">
          <Form.Label>Usuario</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor elija un nombre de usuario.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Ingrese su contraseña"
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">
            La contraseña debe tener al menos 6 caracteres.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Repita su contraseña"
          />
          <Form.Control.Feedback type="invalid">
            Por favor confirme su contraseña.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCiudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su ciudad"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese una ciudad válida.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationRegion">
          <Form.Label>Región</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su región"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese una región válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="validationTerminos">
        <Form.Check
          required
          label="Acepto los términos y condiciones"
          feedback="Debe aceptar antes de enviar."
          feedbackType="invalid"
        />
      </Form.Group>

     <div className="d-flex justify-content-center">
  <Button variant="primary" type="submit" className="px-4">
    Registrarme
  </Button>
</div>

    </Form>
  );
};

export default Registro;
