import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // 👈 importa tu contexto

const Navbar = () => {
  const { cartItems } = useContext(CartContext); // 👈 accede al carrito

  // Calcular cantidad total de productos
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NavbarBS expand="lg" bg="success" data-bs-theme="dark">
      <Container fluid>
        <NavbarBS.Brand as={Link} to="/">MercadoUrbano</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="navbarScroll" />
        <NavbarBS.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/ingreso">Ingresar 🔐</Nav.Link>
            <Nav.Link as={Link} to="/registro">Registrate 🔐</Nav.Link>
            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/productos">Productos</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Servicios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Contactenos</NavDropdown.Item>
            </NavDropdown>

            {/* 🛒 Carrito con contador */}
            <Nav.Link as={Link} to="/carrito">
              🛒 {cartCount > 0 && (
                <span className="badge bg-warning text-dark ms-1">{cartCount}</span>
              )}
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
