const mongoose = require('mongoose');

const { Schema } = mongoose;

const URI = process.env.DB_URI || 'mongodb://localhost:27017/prodcuts';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  await mongoose.connect(URI, options);
  console.log('');
} catch (err) {
  console.error(err);
}

const products = new Schema({

});

mongoose.model('Products', products);