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

  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NavbarBS expand="lg" bg="success" variant="dark" sticky="top">
      <Container fluid>
        {/* 🔵 Logo y marca */}
        <NavbarBS.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo Mercado Urbano"
            style={{ height: "40px", width: "40px", marginRight: "10px" }}
          />
          MercadoUrbano
        </NavbarBS.Brand>

        <NavbarBS.Toggle aria-controls="navbarScroll" />
        <NavbarBS.Collapse id="navbarScroll">
          {/* 🟢 Links de navegación */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
          </Nav>

          {/* 🔴 Sección de usuario y carrito */}
          <Nav className="ms-auto d-flex align-items-center">
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/ingreso">Ingresar 🔐</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registrarse 📝</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/perfil">Mi Perfil 👤</Nav.Link>
                <Button
                  variant="link"
                  className="text-light text-decoration-none"
                  onClick={handleLogout}
                >
                  Cerrar sesión 🔓
                </Button>
              </>
            )}

            <Nav.Link as={NavLink} to="/carrito" className="d-flex align-items-center">
              🛒
              {cartCount > 0 && (
                <>
                  <span className="badge bg-warning text-dark ms-1">{cartCount}</span>
                  <span className="text-light ms-2">
                    ({new Intl.NumberFormat("es-CL").format(totalPrice)} CLP)
                  </span>
                </>
              )}
            </Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;

