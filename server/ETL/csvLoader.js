const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const pgp = require('pg-promise')({});

const cn = 'postgres://thomas:@localHost:5432/products';
const db = pgp(cn);

const products = [];
const productData = new pgp.helpers.ColumnSet(
  ['id', 'name', 'slogan', 'description', 'category', 'default_price'],
  { table: 'products' },
);

fs.createReadStream(path.join(__dirname, './files/products.csv'))
  .pipe(csv())
  .on('data', ({ id, name, slogan, description, category, default_price }) => {
    name = name.replaceAll("'", "''");
    slogan = slogan.replaceAll("'", "''");
    description = description.replaceAll("'", "''");
    category = category.replaceAll("'", "''");
    console.log('Products: ', id);
    products.push({ id, name, slogan, description, category, default_price });
  })
  .on('end', () => {
    db.none(pgp.helpers.insert(products, productData));
    console.log('Products Done.');
  })
  .on('error', (err) => console.log(err));

const features = [];
const featuresData = new pgp.helpers.ColumnSet(
  ['id', 'product_id', 'feature', 'value'],
  { table: 'features' },
);

fs.createReadStream(path.join(__dirname, './files/features.csv'))
  .pipe(csv())
  .on('data', ({ id, product_id, feature, value }) => {
    feature.replaceAll("'", "''");
    value.replaceAll("'", "''");
    console.log('Features: ', id);
    features.push({ id, product_id, feature, value });
  })
  .on('end', () => {
    db.none(pgp.helpers.insert(features, featuresData));
    console.log('Features Done.');
  })
  .on('error', (err) => console.log(err));

const styles = [];
const stylesData = new pgp.helpers.ColumnSet(
  ['id', 'product_id', 'name', 'sale_price', 'original_price', 'default_style'],
  { table: 'styles' },
);

fs.createReadStream(path.join(__dirname, './files/styles.csv'))
  .pipe(csv())
  .on('data', ({ id, product_id, name, sale_price, original_price, default_style }) => {
    default_style = Boolean(default_style);
    name.replaceAll("'", "''");
    console.log('Styles: ', id);
    styles.push({ id, product_id, name, sale_price, original_price, default_style });
  })
  .on('end', () => {
    db.none(pgp.helpers.insert(styles, stylesData));
    console.log('Styles Done.');
  })
  .on('error', (err) => console.log(err));

const skus = [];
const skusData = new pgp.helpers.ColumnSet(
  ['id', 'style_id', 'quantity', 'size'],
  { table: 'skus' },
);

fs.createReadStream(path.join(__dirname, './files/skus.csv'))
  .pipe(csv())
  .on('data', ({ id, style_id, quantity, size }) => {
    size.replaceAll("'", "''");
    console.log('Skus: ', id);
    skus.push({ id, style_id, quantity, size });
  })
  .on('end', () => {
    db.none(pgp.helpers.insert(skus, skusData));
    console.log('Skus Done.');
  })
  .on('error', (err) => console.log(err));

const queryPhotos = async (query1, query2, query3, query4) => {
  try {
    await db.any(query1);
  } catch (err) {
    console.error(err);
  } try {
    await db.any(query2);
  } catch (err) {
    console.log(err);
  } try {
    await db.any(query3);
  } catch (err) {
    console.log(err);
  } try {
    await db.any(query4);
  } catch (err) {
    console.log(err);
  } finally {
    console.log('done');
  }
};

const photos = [];
const photosData = new pgp.helpers.ColumnSet(
  ['id', 'style_id', 'url', 'thumbnail_url'],
  { table: 'photos' },
);

fs.createReadStream(path.join(__dirname, './files/photos.csv'))
  .pipe(csv())
  .on('data', ({ id, style_id, url, thumbnail_url }) => {
    url.replaceAll("'", "''");
    thumbnail_url.replaceAll("'", "''");
    console.log('Photos: ', id);
    photos.push({ id, style_id, url, thumbnail_url });
  })
  .on('end', () => {
    const one = (pgp.helpers.insert(photos.slice(0, photos.length / 4), photosData));
    const two = (pgp.helpers.insert(
      photos.slice(photos.length / 4, photos.length / 2),
      photosData,
    ));
    const three = (pgp.helpers.insert(
      photos.slice(photos.length / 2, -photos.length / 4),
      photosData,
    ));
    const four = (pgp.helpers.insert(photos.slice(-photos.length / 4), photosData));
    queryPhotos(one, two, three, four);
  });

const related = [];
const relatedData = new pgp.helpers.ColumnSet(
  ['id', 'current_product_id', 'related_product_id'],
  { table: 'related' },
);

fs.createReadStream(path.join(__dirname, './files/related.csv'))
  .pipe(csv())
  .on('data', ({ id, current_product_id, related_product_id }) => {
    console.log('related: ', id);
    related.push({ id, current_product_id, related_product_id });
  })
  .on('end', () => {
    db.none(pgp.helpers.insert(related, relatedData));
    console.log('Related Done.');
  });