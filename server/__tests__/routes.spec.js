const request = require('supertest');
const app = require('../index');

describe('Test products route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/products');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test product info route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/products/10000');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test styles route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/products/100000/related');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test related route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/products/100000/related');

    expect(res.statusCode).toBe(200);
  });
});