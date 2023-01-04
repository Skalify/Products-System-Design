require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const pgp = require('pg-promise')({});

const cn = process.env.PG;
const db = pgp(cn);

const parseProducts = () => {
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
      products.push({ id, name, slogan, description, category, default_price });
    })
    .on('end', () => {
      db.none(pgp.helpers.insert(products, productData));
      console.log('Products Done.');
    })
    .on('error', (err) => console.log(err));
};

const parseFeatures = () => {
  const features = {};

  fs.createReadStream(path.join(__dirname, './files/features.csv'))
    .pipe(csv())
    .on('data', ({ product_id, feature, value }) => {
      feature = feature === 'null' ? null : feature;
      value = value === 'null' ? null : value;
      if (!features[product_id]) {
        features[product_id] = [{ feature, value }];
      } else {
        features[product_id].push({ feature, value });
      }
    })
    .on('end', () => {
      db.tx((t) => {
        const queries = Object.keys(features).map((product_id) => {
          return t.any(
            `UPDATE products SET features = '${JSON.stringify(
              features[product_id],
            )}' WHERE id = ${product_id}`,
          );
        });
        return t.batch(queries);
      })
        .then(() => console.log('Features Done.'))
        .catch((err) => console.error(err));
    })
    .on('error', (err) => console.error(err));
};

const parseStyles = () => {
  const styles = [];
  const stylesData = new pgp.helpers.ColumnSet(
    ['style_id', 'product_id', 'name', 'sale_price', 'original_price', 'default_style'],
    { table: 'styles' },
  );

  fs.createReadStream(path.join(__dirname, './files/styles.csv'))
    .pipe(csv())
    .on('data', ({ id, productId, name, sale_price, original_price, default_style }) => {
      default_style = Boolean(default_style);
      name.replaceAll("'", "''");
      const style_id = id;
      const product_id = productId;
      styles.push({ style_id, product_id, name, sale_price, original_price, default_style });
    })
    .on('end', () => {
      db.none(pgp.helpers.insert(styles, stylesData));
      console.log('Styles Done.');
    })
    .on('error', (err) => console.log(err));
};

const parseSkus = () => {
  const skus = {};

  fs.createReadStream(path.join(__dirname, './files/skus.csv'))
    .pipe(csv())
    .on('data', ({ id, styleId, quantity, size }) => {
      const style_id = styleId;
      if (skus[style_id] === undefined) {
        skus[style_id] = {};
      }
      skus[style_id][id] = { quantity, size };
    })
    .on('end', () => {
      db.tx((t) => {
        console.log('Beginning batch for skus')
        const queries = Object.keys(skus).map((style_id) => {
          return t.any(
            `UPDATE styles SET skus = '${JSON.stringify(
              skus[style_id],
            )}' WHERE style_id = ${style_id}`,
          );
        });
        return t.batch(queries);
      })
        .then(() => console.log('Skus Done.'))
        .catch((err) => console.error(err));
    })
    .on('error', (err) => console.error(err));
};

const parsePhotos = () => {
  const photos = {};

  fs.createReadStream(path.join(__dirname, './files/photos.csv'))
    .pipe(csv())
    .on('data', ({ styleId, url, thumbnail_url }) => {
      const style_id = styleId;
      if (style_id > 1500000) {
        if (!photos[style_id]) {
          photos[style_id] = [{ thumbnail_url, url }];
        } else {
          photos[style_id].push({ thumbnail_url, url });
        }
      }
    })
    .on('end', () => {
      db.tx((t) => {
        const queries = Object.keys(photos).map((id) => {
          return t.any(
            `UPDATE styles SET photos = '${JSON.stringify(
              photos[id],
            )}' WHERE style_id = ${id}`,
          );
        });
        return t.batch(queries);
      })
    });
};

const parseRelated = () => {
  const related = [];
  const relatedData = new pgp.helpers.ColumnSet(
    ['id', 'current_product_id', 'related_product_id'],
    { table: 'related' },
  );

  fs.createReadStream(path.join(__dirname, './files/related.csv'))
    .pipe(csv())
    .on('data', ({ id, current_product_id, related_product_id }) => {
      related.push({ id, current_product_id, related_product_id });
    })
    .on('end', () => {
      db.none(pgp.helpers.insert(related, relatedData));
      console.log('Related Done.');
    });
};

const parseCSVS = async () => {
  // try {
  //   await parseProducts();
  // } catch (err) {
  //   console.error(err);
  // }
  // try {
  //   await parseFeatures();
  // } catch (err) {
  //   console.error(err);
  // }
  // try {
  //   await parseStyles();
  // } catch (err) {
  //   console.error(err);
  // }
  // try {
  //   await parseSkus();
  // } catch (err) {
  //   console.error(err);
  // }
  // try {
  //   await parsePhotos();
  // } catch (err) {
  //   console.error(err);
  // }
  // try {
  //   await parseRelated();
  // } catch (err) {
  //   console.error(err);
  // }
};

parseCSVS();