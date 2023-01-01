require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { productsRouter } = require('./routers');

const corsOptions = {
  origin: 'http://localhost',
  methods: ['GET'],
  maxAge: '3600',
};

const app = express();

productsRouter.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRouter);
app.use(morgan('dev'));

app.set('port', process.env.PORT || 8081);

module.exports = app;