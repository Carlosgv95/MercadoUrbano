import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Cart = () => {
  const { cartItems, removeFromCart, total, clearCart } = useContext(CartContext);

  return (
    <div className="p-4">
      <h3>Tu Carrito</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5>Total: ${total}</h5>
          <Button variant="secondary" onClick={clearCart}>Vaciar carrito</Button>
        </>
      )}
    </div>
  );
};

export default Cart;