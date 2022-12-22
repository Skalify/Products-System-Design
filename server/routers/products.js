const products = require('express').Router();
const {
  products: { getProducts, getProductInfo, getStyles, getRelated },
} = require('../controllers');

module.exports = {
  products.get('/products', getProducts);

  products.get('/products/:product_id', getProductInfo);

  products.get('/products/:product_id/styles', getStyles);

  products.get('/products/:product_id/related', getRelated);
};