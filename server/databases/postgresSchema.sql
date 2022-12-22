DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

CREATE TABLE IF NOT EXISTS Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  default_price INTEGER
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
  name VARCHAR(255),
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN
 );

 CREATE TABLE IF NOT EXISTS Skus (
  id SERIAL PRIMARY KEY
  style_id INTEGER REFERENCES Styles(id),
  quantity INTEGER,
  size VARCHAR(255)
 );

 CREATE TABLE IF NOT EXISTS Photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES Styles(id),
  url VARCHAR(255),
  thumbnail_url VARCHAR(255)
 );

  CREATE TABLE IF NOT EXISTS Related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES Products(id),
  related_product_id INTEGER
 );