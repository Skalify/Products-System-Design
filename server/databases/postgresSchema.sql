CREATE DATABASE IF NOT EXISTS Products;

-- DROP TABLE IF EXISTS Related;
-- DROP TABLE IF EXISTS Styles;
-- DROP TABLE IF EXISTS Products;

CREATE TABLE IF NOT EXISTS Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price VARCHAR(255) NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS Styles (
  style_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Products(id),
  name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(255),
  original_price VARCHAR(255) NOT NULL,
  default_style BOOLEAN NOT NULL,
  photos jsonb NOT NULL DEFAULT '[]',
  skus jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS Related (
id SERIAL PRIMARY KEY,
current_product_id INTEGER REFERENCES Products(id),
related_product_id INTEGER NOT NULL
);

Create INDEX style_index ON styles (product_id);
Create INDEX related_index ON Related (current_product_id);