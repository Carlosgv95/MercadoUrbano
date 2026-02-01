-- Crear base de datos
CREATE DATABASE mercadourbano;
\c mercadourbano;

--crear un usuario
CREATE USER mercadouser WITH PASSWORD '12345';

--Otorgar permisos
GRANT USAGE ON SCHEMA public TO mercadouser;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE usuarios TO mercadouser;

--permisos sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE mercadourbano TO mercadouser;


-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(50),
    correo VARCHAR(150) UNIQUE NOT NULL,
    direccion VARCHAR(200),
    contrasena VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_perfil TEXT
);
;
-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    categoria VARCHAR(100),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    imagen TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Tabla de favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de órdenes
CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL
);

-- Tabla detalle de órdenes
CREATE TABLE orden_detalles (
    id SERIAL PRIMARY KEY,
    orden_id INTEGER REFERENCES ordenes(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio NUMERIC(10,2) NOT NULL
);



-- Índices recomendados
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_carrito_usuario ON carrito(usuario_id);
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_ordenes_usuario ON ordenes(usuario_id);
