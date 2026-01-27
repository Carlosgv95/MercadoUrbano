import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    Swal.fire({
      icon: "info",
      title: "Página no encontrada",
      text: "Parece que esta sección no existe o fue movida",
      confirmButtonText: "Volver al inicio",
      customClass: {
        popup: "swal2-border-radius",
        confirmButton: "btn-confirm",
      },
      buttonsStyling: false,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="display-3 fw-bold mb-3">404</h1>
      <h3 className="mb-3">Página no encontrada</h3>
      <p className="text-muted mb-4">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>

      <Button variant="primary" size="lg" onClick={handleGoHome}>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;