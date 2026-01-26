// tests/server.test.js
const request = require('supertest');
const app = require('../server');

describe('MercadoUrbano API', () => {
  it('GET / debe responder con bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Bienvenido');
  });


it('GET /productos/:id debe devolver el producto correcto', async () => {
  const res = await request(app)
    .get('/productos/1') // ID del producto
    .expect(200);

  expect(res.body.nombre).toBe('Coconut Bowls Set');
});


  it('POST /auth/login debe devolver JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'cagv.1995@gmail.com', password: '12345678' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('GET /carrito sin token debe fallar', async () => {
    const res = await request(app).get('/carrito');
    expect(res.statusCode).toBe(401);
  });
});
