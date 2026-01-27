import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NavbarBS expand="lg" bg="success" data-bs-theme="dark">
      <Container fluid>
        <NavbarBS.Brand as={Link} to="/">MercadoUrbano</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="navbarScroll" />
        <NavbarBS.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/ingreso">Ingresar 🔐</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registrate 🔐</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/perfil">Mi Perfil 👤</Nav.Link>
                <Nav.Link as="button" onClick={handleLogout} className="btn btn-link text-light">Cerrar sesión 🔓</Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
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

          {/* 🟢 Logo alineado a la derecha */}
          <img
            src="/logo.png"
            alt="Logo Mercado Urbano"
            style={{ height: "80px", width: "80px", marginLeft: "auto" }}
          />
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;

