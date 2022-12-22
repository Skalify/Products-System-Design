const {
  products: { getDBProducts, getDBProductInfo, getDBStyles, getDBRelated },
} = require('../models');

const getProducts = (req, res) => {
  getDBProducts((err, data) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send(data).status(200);
    }
  });
};

const getProductInfo = (req, res) => {
  getDBProductInfo(req.params.product_id, (err, data) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send(data).status(200);
    }
  });
};

const getStyles = (req, res) => {
  getDBStyles(req.params.product_id, (err, data) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send(data).status(200);
    }
  });
};

const getRelated = (req, res) => {
  getDBRelated(req.params.product_id, (err, data) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send(data).status(200);
    }
  });
};

module.exports = {
  getProducts, getProductInfo, getStyles, getRelated,
};