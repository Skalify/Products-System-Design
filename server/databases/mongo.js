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

const feature = new Schema({
  product_id: Number,
  feature: String,
  value: String,
});

const products = new Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Boolean,
  features: [feature],
});

const sku = new Schema({
  style_id: Number,
  size: String,
  quantity: Number,
});

const photo = new Schema({
  style_id: Number,
  url: String,
  thumbnail_url: String,
});

const styles = new Schema({
  style_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Boolean,
  photos: [photo],
  skus: sku,
});

const related = new Schema({
  current_product_id: Number,
  related_product_id: Number,
});

mongoose.model('Products', products);
mongoose.model('Styles', styles);
mongoose.model('Related', related);