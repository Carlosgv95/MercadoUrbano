--Insertar datos (INSERT)

--Usuarios
INSERT INTO usuarios (nombre, email, password_hash)
VALUES ('Carlos Gómez', 'carlos@correo.com', 'hash_de_password');
--Productos
INSERT INTO productos (nombre, descripcion, precio, precio_original, marca, categoria, stock, image_url)
VALUES ('Zapatillas Urbanas', 'Zapatillas cómodas para uso diario', 29990, 39990, 'Nike', 'Calzado', 50, 'https://miapp.com/img/zapatillas.jpg');

--Actualizar datos (UPDATE)

--Cambiar stock de producto
UPDATE productos
SET stock = stock - 1
WHERE id = 1;
--Cambiar estado de orden
UPDATE ordenes
SET estado = 'pagada'
WHERE id = 10;
--Eliminar datos (DELETE)
DELETE FROM carrito
WHERE usuario_id = 1 AND producto_id = 3;
--Eliminar favorito
DELETE FROM favoritos
WHERE usuario_id = 1 AND producto_id = 5;

--Consultar datos (SELECT)

--listar productos por categoría
SELECT id, nombre, precio, stock
FROM productos
ORDER BY nombre;
--ver favoritos de un usuario
SELECT p.id, p.nombre, p.precio
FROM favoritos f
JOIN productos p ON f.producto_id = p.id
WHERE f.usuario_id = 1;
--carrito de un usuario
SELECT p.nombre, c.cantidad, p.precio, (c.cantidad * p.precio) AS subtotal
FROM carrito c
JOIN productos p ON c.producto_id = p.id
WHERE c.usuario_id = 1;
--ordenes de con detalles
SELECT o.id, o.fecha, o.estado, d.producto_id, d.cantidad, d.precio_unitario
FROM ordenes o
JOIN orden_detalle d ON o.id = d.orden_id
WHERE o.usuario_id = 1;



