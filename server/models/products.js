require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DB,
});

const getDBProducts = (page, count, cb) => {
  pool.query(`SELECT * FROM products LIMIT ${count || 5} OFFSET ${page || 0}`)
    .then(({ rows }) => cb(null, rows))
    .catch((err) => cb(err));
};

const getDBProductInfo = (id, cb) => {
  pool.query(`SELECT * FROM products WHERE id = ${id}`)
    .then(({ rows }) => {
      const data = rows[0];
      pool.query(`SELECT feature, value FROM features WHERE product_id = ${id}`)
        .then((features) => {
          data.features = features.rows;
          cb(null, data);
        })
        .catch((err) => cb(err));
    })
    .catch((err) => cb(err));
};

const getDBStyles = async (id, cb) => {
  let results = {};
  try {
    await pool.query(`SELECT * FROM styles WHERE style_id = ${id}`)
      .then(({ rows }) => results = rows[0]);
    await pool.query(`SELECT thumbnail_url, url FROM photos WHERE style_id = ${id}`)
      .then((photos) => {
        results.photos = photos.rows.length
          ? photos.rows
          : [{ thumbnail_url: null, url: null }]
      });
    await pool.query(`SELECT id, quantity, size FROM skus WHERE style_id = ${id}`)
    .then((skus) => {
      results.skus = skus.rows.length
        ? skus.rows.reduce((acc, sku) => {
          acc[sku.id] = { quantity: sku.quantity, size: sku.size };
          return acc;
        }, {})
        : { null: { quantity: null, size: null } }
    });
  } catch {

  } finally {
    cb(null, results);
  }

  // pool.query(`SELECT * FROM styles WHERE style_id = ${id}`)
  //   .then(({ rows }) => {
  //     const data = rows[0];
  //     pool.query(`SELECT thumbnail_url, url FROM photos WHERE style_id = ${id}`)
  //       .then((photos) => {
  //         data.photos = photos.rows.length
  //           ? photos.rows
  //           : [{ thumbnail_url: null, url: null }];
  //         pool.query(`SELECT id, quantity, size FROM skus WHERE style_id = ${id}`)
  //           .then((skus) => {
  //             data.skus = skus.rows.length
  //               ? skus.rows.reduce((acc, sku) => {
  //                 acc[sku.id] = { quantity: sku.quantity, size: sku.size };
  //                 return acc;
  //               }, {})
  //               : { null: { quantity: null, size: null } };
  //             cb(null, data);
  //           })
  //           .catch((err) => cb(err));
  //       })
  //       .catch((err) => cb(err));
  //   })
  //   .catch((err) => cb(err));
};

const getDBRelated = (id, cb) => {
  pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id}`)
    .then(({ rows }) => cb(null, rows.map((row) => row.related_product_id)))
    .catch((err) => cb(err));
};

module.exports = {
  getDBProducts, getDBProductInfo, getDBStyles, getDBRelated,
};