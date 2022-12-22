const {
  products: { getDBProducts, getDBProductInfo, getDBStyles, getDBRelated },
} = require('../models');

module.exports = {
  getProducts: (req, res) => {
    getDBProducts((err, data) => {
      if (err) {
        res.send(err).status(404);
      } else {
        res.send(data).status(200);
      }
    });
  },

  getProductInfo: (req, res) => {
    getDBProductInfo((err, data) => {
      if (err) {
        res.send(err).status(404);
      } else {
        res.send(data).status(200);
      }
    });
  },

  getStyles: (req, res) => {
    getDBStyles((err, data) => {
      if (err) {
        res.send(err).status(404);
      } else {
        res.send(data).status(200);
      }
    });
  },

  getRelated: (req, res) => {
    getDBRelated((err, data) => {
      if (err) {
        res.send(err).status(404);
      } else {
        res.send(data).status(200);
      }
    });
  },
};