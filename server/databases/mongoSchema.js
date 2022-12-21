const mongoose = require('mongoose');

const { Schema } = mongoose;

const URI = process.env.DB_URI || 'mongodb://localhost:27017/products';

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
  product_id: { type: Number, unique: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{ feature: String, value: String }],
});

const styles = new Schema({
  product_id: { type: Number, unique: true },
  result: [{
    style_id: Number,
    name: String,
    sale_price: String,
    original_price: String,
    default_style: Boolean,
    photos: [{ url: String, thumbnail_url: String }],
    skus: [{ sku: { size: String, quantity: Number } }],
  }],
});

const related = new Schema({
  product_id: { type: Number, unique: true },
  related: [Number],
});

mongoose.model('Products', products);
mongoose.model('Styles', styles);
mongoose.model('Related', related);