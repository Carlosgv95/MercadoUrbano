import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../services/api';
import Swal from "sweetalert2";
import { Container, Row, Col, Card, Button, ListGroup, Spinner, Accordion, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    correo: user?.correo || '',
    foto_perfil: user?.foto_perfil || ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🟡 Cargar historial de órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/ordenes?usuario_id=${user.id}`);
        setOrders(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el historial de órdenes",
          confirmButtonText: "Cerrar",
        });
      } finally {
        setLoadingOrders(false);
      }
    };
    if (user?.id) fetchOrders();
  }, [user]);

  // 🔵 Cerrar sesión
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Cerrar sesión",
      text: "¿Deseas salir de tu cuenta?",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      logout();
      navigate('/');
    }
  };

  // 🔴 Eliminar cuenta
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Eliminar cuenta",
      text: "Esta acción es permanente. ¿Deseas continuar?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
    });
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/usuarios/${user.id}`);
      await Swal.fire({
        icon: "success",
        title: "Cuenta eliminada",
        text: "Tu cuenta ha sido eliminada correctamente",
        confirmButtonText: "Aceptar",
      });
      logout();
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la cuenta",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // 🟢 Guardar cambios
  const handleSave = async () => {
    try {
      const response = await api.put(`/usuarios/${user.id}`, formData);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      await Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Tus datos se han guardado correctamente",
        confirmButtonText: "Aceptar",
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el perfil",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ minHeight: '90vh' }}>
        
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-white border-end p-4">
          <h4 className="text-primary fw-bold mb-4">MI PERFIL</h4>
          <Nav className="flex-column gap-3">
            <Nav.Link as={Link} to="/mis-productos">🎲 Mis Productos</Nav.Link>
            <Nav.Link as={Link} to="/favoritos">❤️ Mis Favoritos</Nav.Link>
          </Nav>
        </Col>

        {/* Main content */}
        <Col md={9} lg={10} className="bg-light p-5">
          
          {/* Datos del Usuario */}
          <Card className="shadow-sm p-4 mb-4">
            <Card.Body>
              <h4 className="mb-4">Datos del Usuario</h4>
              <div className="text-center mb-4">
                <img
                  src={
                    user?.foto_perfil && user.foto_perfil.trim() !== ""
                      ? user.foto_perfil
                      : "https://picsum.photos/150"
                  }
                  onError={(e) => { e.target.src = "https://picsum.photos/150"; }}
                  alt="Foto de perfil"
                  className="rounded-circle"
                  width="150"
                  height="150"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {!isEditing ? (
                <>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Nombre:</strong> {user?.nombre}</ListGroup.Item>
                    <ListGroup.Item><strong>Apellido:</strong> {user?.apellido}</ListGroup.Item>
                    <ListGroup.Item><strong>Teléfono:</strong> {user?.telefono}</ListGroup.Item>
                    <ListGroup.Item><strong>Dirección:</strong> {user?.direccion}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {user?.correo}</ListGroup.Item>
                  </ListGroup>

                  <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <Button variant="secondary" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                    <Button variant="primary" onClick={handleLogout}>Cerrar Sesión</Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>Eliminar cuenta</Button>
                  </div>
                </>
              ) : (
                <>
                  <form>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control mb-2" />
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="form-control mb-2" />
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control mb-2" />
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="form-control mb-2" />
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="form-control mb-2" />
                    <input type="text" name="foto_perfil" value={formData.foto_perfil} onChange={handleChange} className="form-control mb-2" placeholder="URL de tu foto de perfil" />
                  </form>

                  <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Historial de Órdenes */}
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="mb-4">Historial de Órdenes</h4>
              {loadingOrders ? (
                <div className="text-center"><Spinner animation="border" /></div>
              ) : orders.length === 0 ? (
                <p>No tienes órdenes registradas.</p>
              ) : (
                <Accordion>
                  {orders.map((orden, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={orden.id}>
                      <Accordion.Header>
                        Orden #{orden.id} - {new Date(orden.fecha).toLocaleDateString()} - Total: ${orden.total}
                      </Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          {orden.detalles.map(det => (
  <ListGroup.Item key={det.id} className="d-flex align-items-center gap-3">
  <img
    src={det.imagen}
    alt={det.nombre}
    width="50"
    height="50"
    style={{ objectFit: 'cover', borderRadius: '5px' }}
    onError={(e) => { e.target.src = "https://picsum.photos/50"; }}
  />
  <div>
    <strong>{det.nombre}</strong><br />
    Cantidad: {det.cantidad} | Precio: ${det.precio}
  </div>
</ListGroup.Item>

                          ))}
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;




