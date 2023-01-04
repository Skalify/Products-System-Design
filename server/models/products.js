require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DB,
});

const getDBProducts = (page, count, cb) => {
  pool.query(`SELECT id, name, slogan, description, category, default_price FROM products LIMIT ${count || 5} OFFSET ${page || 0}`)
    .then(({ rows }) => cb(null, rows))
    .catch((err) => cb(err));
};

const getDBProductInfo = (id, cb) => {
  pool.query(`SELECT * FROM products WHERE id = ${id}`)
    .then(({ rows }) => cb(null, rows[0]))
    .catch((err) => cb(err));
};

const getDBStyles = async (id, cb) => {
  pool.query(`SELECT * FROM styles WHERE style_id = ${id}`)
    .then(({ rows }) => cb(null, rows))
    .catch((err) => cb(err));
};

const getDBRelated = (id, cb) => {
  pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id}`)
    .then(({ rows }) => cb(null, rows.map((row) => row.related_product_id)))
    .catch((err) => cb(err));
};

module.exports = {
  getDBProducts, getDBProductInfo, getDBStyles, getDBRelated,
};