
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Toastify from "toastify-js";
import Swal from "sweetalert2";
import api from "../../services/api";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty, total } =
    useContext(CartContext);
  const { user } = useContext(UserContext); // ✅ Obtenemos el usuario desde el contexto

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

  // Comprar productos y enviar orden al backend
  const handleBuy = async () => {
    // ✅ Validación: usuario no logueado
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Por favor, inicia sesión para completar la compra.",
        confirmButtonText: "Ir a Ingresar",
      }).then(() => {
        window.location.href = "/ingreso"; // Redirige a la página de login
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Tu carrito está vacío",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      // ✅ Enviar orden al backend
      const response = await api.post("/ordenes", {
        usuario_id: user.id,
        productos: cartItems,
        total: total,
      });

      Swal.fire({
        icon: "success",
        title: "Orden creada con éxito",
        html: `
          <p><b>ID de orden:</b> ${response.data.orden_id}</p>
          <p><b>Total:</b> ${formatPrice(total)}</p>
        `,
        confirmButtonText: "Ok",
      });

      clearCart();
    } catch (error) {
      console.error("Error al crear orden:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la compra. Intenta nuevamente.",
      });
    }
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
                  <td>{formatPrice(item.price * item.quantity)}</td>
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

