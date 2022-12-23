const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'products',
});

const getDBProducts = (cb) => {
  pool.query('SELECT * FROM products LIMIT 10', (err, data) => cb(err, data));
};

const getDBProductInfo = (id, cb) => {
  pool.query('SELECT * FROM products LIMIT 10', (err, data) => cb(err, data));
};

const getDBStyles = (id, cb) => {
  pool.query('SELECT * FROM products LIMIT 10', (err, data) => cb(err, data));
};

const getDBRelated = (id, cb) => {
  pool.query('SELECT * FROM products LIMIT 10', (err, data) => cb(err, data));
};

module.exports = {
  getDBProducts, getDBProductInfo, getDBStyles, getDBRelated,
};