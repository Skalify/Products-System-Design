require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { products } = require('./routers');

const corsOptions = {
  origin: 'http://localhost',
  methods: ['GET'],
  maxAge: '3600',
};

const app = express();
const PORT = process.env.PORT || 8081;

products.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(products);
app.use(morgan('dev'));

app.listen(PORT, console.log(`Now listening on http://localhost:${PORT}`));