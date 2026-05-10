const request = require('supertest');
const app = require('../src/app');

describe('Inventario API', () => {
  test('GET / should return Hola Mundo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('¡Hola Mundo!');
  });

  test('POST /api/cliente should validate body', async () => {
    const res = await request(app).post('/api/cliente').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('ok', false);
  });
});
