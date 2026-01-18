import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
    // aquí podrías redirigir a /productos?search=query
  };

  return (
    <NavbarBS expand="lg" bg="success" data-bs-theme="dark">
      <Container fluid>
        <NavbarBS.Brand as={Link} to="/">MercadoUrbano</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="navbarScroll" />
        <NavbarBS.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/ingreso">Ingresar 🔐</Nav.Link>
            <Nav.Link as={NavLink} to="/registro">Registrate 🔐</Nav.Link>
            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
              <NavDropdown.Item as={NavLink} to="/productos">Productos</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Servicios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Contactenos</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/carrito">
              🛒 {cartCount > 0 && (
                <>
                  <span className="badge bg-warning text-dark ms-1">{cartCount}</span>
                  <span className="text-light ms-2">
                    ({new Intl.NumberFormat("es-CL").format(totalPrice)} CLP)
                  </span>
                </>
              )}
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-dark" type="submit">Buscar</Button>
          </Form>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;

