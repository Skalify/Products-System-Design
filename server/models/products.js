// const db = require('pg');

const getDBProducts = (cb) => {
  console.log('products');
  cb(null, true);
};

const getDBProductInfo = (id, cb) => {
  console.log('productInfo for: ', id);
  cb(null, true);
};

const getDBStyles = (id, cb) => {
  console.log('styles for: ', id);
  cb(null, true);
};

const getDBRelated = (id, cb) => {
  console.log('related for: ', id);
  cb(null, true);
};

module.exports = {
  getDBProducts, getDBProductInfo, getDBStyles, getDBRelated,
};