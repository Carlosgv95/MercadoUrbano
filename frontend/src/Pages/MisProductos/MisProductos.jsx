
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../services/api';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MisProductos = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  // Estados para modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });

  // Si no hay usuario, redirige al login
  useEffect(() => {
    if (!user) {
      navigate('/ingreso');
    }
  }, [user, navigate]);

  // Obtener productos del usuario
  const fetchProductos = async () => {
    try {
      const response = await api.get(`/productos/usuario/${user.id}`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    if (user) fetchProductos();
  }, [user]);

  // Abrir modal para editar
  const handleEdit = (producto) => {
    setProductoEdit(producto);
    setShowEditModal(true);
  };

  // Guardar cambios en producto editado
  const handleSaveEdit = async () => {
    try {
      await api.put(`/productos/${productoEdit.id}`, productoEdit);
      setMensaje('✅ Producto actualizado correctamente');
      setShowEditModal(false);
      fetchProductos();
    } catch (error) {
      setMensaje('❌ Error al actualizar el producto');
      console.error(error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        setMensaje('✅ Producto eliminado correctamente');
        fetchProductos();
      } catch (error) {
        setMensaje('❌ Error al eliminar el producto');
        console.error(error);
      }
    }
  };

  // Abrir modal para agregar nuevo producto
  const handleAdd = () => {
    setShowAddModal(true);
  };

  // Guardar nuevo producto
  const handleSaveAdd = async () => {
    try {
      await api.post('/productos', { ...nuevoProducto, usuario_id: user.id });
      setMensaje('✅ Producto agregado correctamente');
      setShowAddModal(false);
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', imagen: '' });
      fetchProductos();
    } catch (error) {
      setMensaje('❌ Error al agregar el producto');
      console.error(error);
    }
  };

  const handleChangeEdit = (e) => {
    setProductoEdit({ ...productoEdit, [e.target.name]: e.target.value });
  };

  const handleChangeAdd = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <h2>Mis Productos</h2>
      {mensaje && <Alert>{mensaje}</Alert>}
      <Button variant="primary" className="mb-3" onClick={handleAdd}>➕ Agregar Producto</Button>
      <Row>
        {productos.length > 0 ? (
          productos.map((prod) => (
            <Col md={4} key={prod.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={prod.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text>{prod.descripcion}</Card.Text>
                  <Card.Text><strong>Precio:</strong> ${prod.precio}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(prod)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(prod.id)}>Eliminar</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tienes productos publicados</p>
        )}
      </Row>

      {/* Modal para editar */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoEdit && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={productoEdit.nombre} onChange={handleChangeEdit} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" name="descripcion" value={productoEdit.descripcion} onChange={handleChangeEdit} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value={productoEdit.precio} onChange={handleChangeEdit} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control name="imagen" value={productoEdit.imagen} onChange={handleChangeEdit} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>

        
{/* Modal para agregar */}
<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Agregar Nuevo Producto</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name="nombre" value={nuevoProducto.nombre} onChange={handleChangeAdd} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control name="categoria" value={nuevoProducto.categoria} onChange={handleChangeAdd} placeholder="Ej: Kitchen, Food, etc." />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" name="descripcion" value={nuevoProducto.descripcion} onChange={handleChangeAdd} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name="precio" value={nuevoProducto.precio} onChange={handleChangeAdd} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control name="imagen" value={nuevoProducto.imagen} onChange={handleChangeAdd} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancelar</Button>
    <Button variant="primary" onClick={handleSaveAdd}>Agregar Producto</Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default MisProductos;
