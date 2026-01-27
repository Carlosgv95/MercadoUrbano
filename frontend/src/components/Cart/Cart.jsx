import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import api from "../../services/api";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    total,
  } = useContext(CartContext);

  const { user } = useContext(UserContext);

  // Formatear precios con validación
  const formatPrice = (value) => {
    const number = Number(value);
    if (isNaN(number) || number <= 0) return "$0";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(number);
  };

  // 🟡 Confirmación profesional estilo Mercado Libre
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Tu carrito está vacío",
        confirmButtonText: "Ok",
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        popup: "swal2-border-radius",
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          icon: "success",
          title: "Carrito vaciado",
          text: "Tu carrito ha sido vaciado correctamente",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn-confirm",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  // 🟢 Swal.fire profesional al eliminar producto
  const handleRemove = (id) => {
    removeFromCart(id);

    Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      text: "El producto fue eliminado del carrito",
      timer: 1800,
      showConfirmButton: false,
      customClass: {
        popup: "swal2-border-radius",
      }
    });
  };

  // 🛒 Comprar productos
  const handleBuy = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Por favor, inicia sesión para completar la compra.",
        confirmButtonText: "Ir a Ingresar",
      }).then(() => {
        window.location.href = "/ingreso";
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
              {cartItems.map((item) => {
                const price = Number(item.price);
                const quantity = Number(item.quantity);
                const subtotal = price * quantity;

                return (
                  <tr key={item.id}>
                    <td>{item.name || "Sin nombre"}</td>
                    <td>{formatPrice(price)}</td>

                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </Button>

                      <span className="mx-2">{quantity}</span>

                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                    </td>

                    <td>{formatPrice(subtotal)}</td>

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
                );
              })}
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