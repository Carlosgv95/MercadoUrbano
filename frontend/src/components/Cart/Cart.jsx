import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty, total } =
    useContext(CartContext);

  // Formatear precios
  const formatPrice = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);

  // Confirmación para vaciar carrito
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Tu carrito está vacío",
        confirmButtonText: "Ok",
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar carrito",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Eliminado", "Tu carrito ha sido vaciado", "success");
      }
    });
  };

  // Eliminar producto con notificación
  const handleRemove = (id) => {
    removeFromCart(id);
    Toastify({
      text: "Producto eliminado",
      duration: 1500,
      gravity: "bottom",
      position: "right",
      style: { background: "linear-gradient(to right, #df2020, #c70202)" },
    }).showToast();
  };

  // Comprar productos
  const handleBuy = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Tu carrito está vacío",
        confirmButtonText: "Ok",
      });
      return;
    }

    Swal.fire({
      title: "Completa tu orden",
      html: `<form id="form" class="form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name" placeholder="Ingresa tu nombre">
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo">
        </div>
      </form>`,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        Swal.fire({
          title: "Resumen de la orden",
          html: `
            <p><b>Fecha:</b> ${new Date().toLocaleString()}</p>
            <p><b>Comprador:</b> ${name} (${email})</p>
            <h3>Productos</h3>
            <ul>
              ${cartItems
                .map((p) => `<li>${p.name} - Cantidad: ${p.quantity}</li>`)
                .join("")}
            </ul>
            <h3>Total</h3>
            <p>${formatPrice(total)}</p>
          `,
        }).then(() => {
          clearCart();
          Swal.fire({
            icon: "success",
            title: "Tu orden ha sido enviada",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h3>Tu Carrito</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío. ¡Agrega productos para comenzar!</p>
      ) : (
        <>
          <Table responsive striped bordered hover>
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
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </Button>
                  </td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5>Total: {formatPrice(total)}</h5>
          <div className="mt-3">
            <Button variant="secondary" onClick={handleClearCart}>
              Vaciar carrito
            </Button>{" "}
            <Button variant="success" onClick={handleBuy}>
              Comprar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
