-- Crear base de datos
CREATE DATABASE mercadourbano;
\c mercadourbano;

--crear un usuario
CREATE USER mercadouser WITH PASSWORD '12345';

--permisos sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE mercadourbano TO mercadouser;


-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    precio_original NUMERIC(10,2),
    marca VARCHAR(100),
    categoria VARCHAR(100),
    stock INT DEFAULT 0,
    image_url TEXT
);

-- Tabla de carrito (productos agregados por usuario)
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
    cantidad INT DEFAULT 1,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, producto_id)
);

-- Tabla de órdenes
CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    total NUMERIC(10,2) NOT NULL
);

-- Tabla detalle de órdenes
CREATE TABLE orden_detalle (
    id SERIAL PRIMARY KEY,
    orden_id INT REFERENCES ordenes(id) ON DELETE CASCADE,
    producto_id INT REFERENCES productos(id),
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL
);

-- Índices recomendados
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_carrito_usuario ON carrito(usuario_id);
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_ordenes_usuario ON ordenes(usuario_id);
