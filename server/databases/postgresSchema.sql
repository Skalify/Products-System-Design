DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

DROP TABLE IF EXISTS Skus;
DROP TABLE IF EXISTS Photos;

CREATE TABLE IF NOT EXISTS Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price VARCHAR(255) NOT NULL
 );

 CREATE TABLE IF NOT EXISTS Features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Products(id),
  feature VARCHAR(255),
  value VARCHAR(255)
 );

 CREATE TABLE IF NOT EXISTS Styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Products(id),
  name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(255),
  original_price VARCHAR(255) NOT NULL,
  default_style BOOLEAN NOT NULL
 );

 CREATE TABLE IF NOT EXISTS Skus (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES Styles(id),
  quantity INTEGER,
  size VARCHAR(255)
 );

 CREATE TABLE IF NOT EXISTS Photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES Styles(id),
  url VARCHAR(1000),
  thumbnail_url VARCHAR(1000)
 );

  CREATE TABLE IF NOT EXISTS Related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES Products(id),
  related_product_id INTEGER NOT NULL
 );