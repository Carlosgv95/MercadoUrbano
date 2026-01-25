// tests/server.test.js
const request = require('supertest');
const app = require('../server');

describe('MercadoUrbano API', () => {
  it('GET / debe responder con bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Bienvenido');
  });

  it('POST /usuarios debe registrar usuario', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nombre: 'Juan', email: 'juan@correo.com', password: '123456' });
    expect(res.statusCode).toBe(201);
  });

  it('POST /auth/login debe devolver JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'juan@correo.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('GET /carrito sin token debe fallar', async () => {
    const res = await request(app).get('/carrito');
    expect(res.statusCode).toBe(401);
  });
});
