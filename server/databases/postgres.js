CREATE TABLE Products (
  product_id BIGSERIAL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price BOOLEAN
 );


 ALTER TABLE Products ADD CONSTRAINT Products_pkey PRIMARY KEY (product_id);

 CREATE TABLE Features (
  product_id INTEGER,
  feature VARCHAR,
  value VARCHAR
 );


 ALTER TABLE Features ADD CONSTRAINT Features_pkey PRIMARY KEY (product_id);

 CREATE TABLE Related (
  current_product_id INTEGER,
  related_product_id INTEGER
 );


 ALTER TABLE Related ADD CONSTRAINT Related_pkey PRIMARY KEY (current_product_id);

 CREATE TABLE Skus (
  style_id BIGSERIAL,
  sku BIGSERIAL,
  quantity INTEGER,
  size VARCHAR
 );


 ALTER TABLE Skus ADD CONSTRAINT Skus_pkey PRIMARY KEY (style_id);

 CREATE TABLE Photos (
  style_id BIGSERIAL,
  url VARCHAR,
  thumbnail_url VARCHAR
 );


 ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (style_id);

 CREATE TABLE Styles (
  style_id BIGSERIAL,
  product_id INTEGER,
  name VARCHAR,
  original_price VARCHAR,
  sale_price VARCHAR,
  default_price BOOLEAN
 );


 ALTER TABLE Styles ADD CONSTRAINT Styles_pkey PRIMARY KEY (style_id);

 ALTER TABLE Products ADD CONSTRAINT Products_product_id_fkey FOREIGN KEY (product_id) REFERENCES Related(current_product_id);
 ALTER TABLE Products ADD CONSTRAINT Products_product_id_fkey FOREIGN KEY (product_id) REFERENCES Features(product_id);
 ALTER TABLE Skus ADD CONSTRAINT Skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES Styles(style_id);
 ALTER TABLE Photos ADD CONSTRAINT Photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES Styles(style_id);
 ALTER TABLE Styles ADD CONSTRAINT Styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES Products(product_id);