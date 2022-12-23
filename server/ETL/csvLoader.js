const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'products',
});

fs.createReadStream(path.join(__dirname, './files/products.csv'))
  .pipe(csv())
  .on('data', ({ id, name, slogan, description, category, default_price }) => {
    name = name.replaceAll("'", "''");
    slogan = slogan.replaceAll("'", "''");
    description = description.replaceAll("'", "''");
    category = category.replaceAll("'", "''");
    pool.query(`INSERT INTO products VALUES (${id},'${name}', '${slogan}', '${description}', '${category}', ${default_price})`);
  })
  .on('end', () => {
    console.log('Products Done!');
  });

fs.createReadStream(path.join(__dirname, './files/features.csv'))
  .pipe(csv())
  .on('data', ({ id, product_id, feature, value }) => {
    feature.replaceAll("'", "''");
    value.replaceAll("'", "''");
    pool.query(`INSERT INTO features VALUES (${id}, ${product_id}, '${feature}', '${value}')`);
  })
  .on('end', () => {
    console.log('Featues Done!');
  });

fs.createReadStream(path.join(__dirname, './files/styles.csv'))
  .pipe(csv())
  .on('data', ({ id, productId, name, sale_price, original_price, default_style }) => {
    default_style = Boolean(default_style);
    name.replaceAll("'", "''");
    pool.query(`INSERT INTO styles VALUES (${id}, ${productId}, '${name}', ${sale_price}, ${original_price}, ${default_style})`);
  })
  .on('end', () => {
    console.log('Styles Done!');
  });

fs.createReadStream(path.join(__dirname, './files/skus.csv'))
  .pipe(csv())
  .on('data', ({ id, styleId, quantity, size }) => {
    size.replaceAll("'", "''");
    pool.query(`INSERT INTO skus VALUES (${id}, ${styleId}, ${quantity}, '${size}')`);
  })
  .on('end', () => {
    console.log('Skus Done!');
  });

fs.createReadStream(path.join(__dirname, './files/photos.csv'))
  .pipe(csv())
  .on('data', ({ id, styleId, url, thumbnail_url }) => {
    url.replaceAll("'", "''");
    thumbnail_url.replaceAll("'", "''");
    pool.query(`INSERT INTO photos VALUES (${id}, ${styleId}, '${url}', '${thumbnail_url}')`);
  })
  .on('end', () => {
    console.log('Photos Done!');
  });

fs.createReadStream(path.join(__dirname, './files/related.csv'))
  .pipe(csv())
  .on('data', ({ id, current_product_id, related_product_id }) => {
    pool.query(`INSERT INTO related VALUES (${id}, ${current_product_id}, ${related_product_id})`);
  })
  .on('end', () => {
    console.log('Related Done!');
  });