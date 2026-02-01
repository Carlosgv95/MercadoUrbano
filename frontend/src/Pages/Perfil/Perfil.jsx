import { Container, Row, Col, Nav, Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../services/api';

const Perfil = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      try {
        await api.delete(`/usuarios/${user.id}`);
        alert('✅ Cuenta eliminada correctamente');
        logout();
        navigate('/');
      } catch (error) {
        alert('❌ Error al eliminar la cuenta');
        console.error(error);
      }
    }
  };

const handleSave = async () => {
  try {
    const response = await api.put(`/usuarios/${user.id}`, formData);

    alert('✅ Perfil actualizado correctamente');

    // ACTUALIZA CONTEXTO
    setUser(response.data.user);

    // ACTUALIZA LOCALSTORAGE
    localStorage.setItem('user', JSON.stringify(response.data.user));

    setIsEditing(false);

  } catch (error) {
    alert('❌ Error al actualizar el perfil');
    console.error(error);
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
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="mb-4">Datos del Usuario</h4>

              {/* FOTO DE PERFIL */}
              <div className="text-center mb-4">
                <img
  src={
    user?.foto_perfil && user.foto_perfil.trim() !== ""
      ? user.foto_perfil
      : "https://picsum.photos/150"
  }
  onError={(e) => {
    e.target.src = "https://picsum.photos/150";
  }}
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
                    <ListGroup.Item><strong>Foto de Perfil:</strong> {user?.foto_perfil}</ListGroup.Item>
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

                    {/* INPUT FOTO PERFIL */}
                    <input
                      type="text"
                      name="foto_perfil"
                      placeholder="URL de tu foto de perfil"
                      value={formData.foto_perfil}
                      onChange={handleChange}
                      className="form-control mb-2"
                    />
                  </form>

                  <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;




