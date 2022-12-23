const productsRouter = require('express').Router();
const {
  products: { getProducts, getProductInfo, getStyles, getRelated },
} = require('../controllers');

productsRouter.get('/products/:page?/:count?', getProducts);
productsRouter.get('/products/:product_id', getProductInfo);
productsRouter.get('/products/:product_id/styles', getStyles);
productsRouter.get('/products/:product_id/related', getRelated);

module.exports = productsRouter;