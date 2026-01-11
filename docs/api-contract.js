/**
 * ============================================================
 * CONTRATO DE DATOS - API REST MERCADO URBANO
 * Estándar de Comunicación Frontend (React) <-> Backend (Node)
 * ============================================================
 */

// 1. AUTENTICACIÓN: Inicio de Sesión
// Endpoint: POST /api/user/login
const LOGIN_CONTRACT = {
  request_body: {
    email: "juan.perez@example.com",
    password: "hashed_password_123"
  },
  response_200: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: 1,
      nombre: "Juan Perez",
      email: "juan.perez@example.com"
    }
  }
};

// 2. PRODUCTOS: Crear Nueva Publicación
// Endpoint: POST /api/products (Requiere JWT)
const CREATE_PRODUCT_CONTRACT = {
  headers: {
    Authorization: "Bearer <token_jwt>"
  },
  request_body: {
    name: "Zapatillas Superstar",
    price: 89990,
    brand: "Originals",
    description: "Diseño clásico de los 70 en cuero",
    imageUrl: "https://images.com/superstar.jpg"
  },
  response_201: {
    status: "success",
    message: "Publicación creada con éxito",
    data: { productId: 45 }
  }
};

// 3. PERFIL: Obtener Datos de Usuario
// Endpoint: GET /api/user/profile (Requiere JWT)
const USER_PROFILE_CONTRACT = {
  headers: {
    Authorization: "Bearer <token_jwt>"
  },
  response_200: {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    email: "juan.perez@example.com",
    telefono: "123456789",
    direccion: "Calle Falsa 123"
  }
};

/**
 * Nota técnica: Los errores (400, 401, 500) retornan 
 * un objeto estándar: { "error": "Descripción del error" }
 */