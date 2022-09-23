-- PSQL COMMANDS AND FUNCTIONS
-- tables

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    datime DATE DEFAULT CURRENT_TIMESTAMP,
    email TEXT NOT NULL,
    message TEXT NOT NULL
)

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    fullname TEXT,
    address TEXT,
    age INTEGER,
    phone_number_prefix TEXT,
    phone_number INTEGER,
    avatar TEXT
);

CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user'
);


CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  created_date DATE NOT NULL,
  product_name text NOT NULL,
  description text NOT NULL,
  code text NOT NULL,
  price float NOT NULL,
  photo text NOT NULL,
  category_id INT NOT NULL REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL
)

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_date DATE NOT NULL
);

CREATE TABLE product_cart (
  id SERIAL PRIMARY KEY,
  created_date DATE NOT NULL,
  cart_id INTEGER NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  items INTEGER NOT NULL
);

CREATE TABLE sales_data (
  id SERIAL PRIMARY KEY,
  sale_date DATE NOT NULL,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  items INTEGER NOT NULL,
  price FLOAT NOT NULL
);


CREATE TABLE product_stock (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  move_date DATE NOT NULL,
  type_movement TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

-- A SQL Function that extracts a number of products from db if there are enough items, puts them in a cart_product table until it gets resolve, either purchased or canceled.

CREATE OR REPLACE FUNCTION createUser(username TEXT, email TEXT, password TEXT, fullname TEXT, address TEXT, age INT, phone_number_prefix TEXT, phone_number INT, avatar TEXT) RETURNS INTEGER AS
$$
declare
  last_user_id INTEGER;
begin
  INSERT INTO users (username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
  select currval('users_id_seq') INTO last_user_id;
  INSERT INTO carts (user_id,created_date) VALUES (last_user_id,now());
  INSERT INTO user_roles (user_id, role) VALUES (last_user_id, 'user');
  return last_user_id;
end;
$$ language plpgsql;


-- function

CREATE or REPLACE FUNCTION addProductToCart(product_id INT, items INT, user_id INT) RETURNS TEXT AS
$$
declare
  	cart_id INTEGER;
	last_id INTEGER;
BEGIN 
  SELECT c.id INTO cart_id FROM carts c WHERE c.user_id = $3;
  INSERT INTO product_cart (created_date,cart_id,product_id,items) VALUES (now(), cart_id,$1,$2);
  RETURN 'Process completed...';
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION checkout(user_id INTEGER) RETURNS INTEGER AS
$$
declare
  last_sale_id INTEGER;
begin
	insert into sales_data (sale_date, user_id, cart_id, product_id, items, price, total)
	with user_cart as (
		select c.id as cart_id, c.user_id, pc.product_id, pc.items from carts c left join product_cart pc on c.id = pc.cart_id
	)
	SELECT now(),uc.user_id, uc.cart_id, uc.product_id, uc.items, p.price, (p.price * uc.items) as total
	FROM public.products p
	left join user_cart uc on p.id = uc.product_id
	where uc.user_id = $1;
	select currval('sales_data_id_seq') INTO last_sale_id;
	delete from product_cart where cart_id = (select distinct c.id from carts c left join product_cart pc on c.id = pc.cart_id where c.user_id = $1);
  	return last_sale_id;
end;
$$ language plpgsql;


CREATE OR REPLACE FUNCTION createProduct(
  product_name TEXT,
  description TEXT,
  code TEXT,
  price FLOAT,
  photo TEXT,
  stock INTEGER
) RETURNS INTEGER AS
$$
DECLARE
  last_product_id INTEGER;
BEGIN
  INSERT INTO products (created_date, product_name, description, code, price, photo) 
    VALUES (now(),$1, $2, $3, $4, $5);
  SELECT currval('products_id_seq') INTO last_product_id;
  INSERT INTO product_stock (product_id, move_date, type_movement, quantity)
    VALUES (last_product_id, now(), 'IN', $6);
  RETURN last_product_id;
END;
$$ LANGUAGE PLPGSQL;

-- Users
select * from createUser('jorgem','jorge@gmail.com','jorge123','Jorge Martinez','Calle de la casa',20,'+34',6123456789,'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');

select * from createUser('mariah','maria@gmail.com','maria123','Maria Hu','Calle',24,'+45',65484,'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');

-- products

select * from createProduct('Shoes','Shoes','DDF34',1000,'https://loremflickr.com/640/480/business',2000);
select * from createProduct('Shoes','Shoes','DDF34',1000,'https://loremflickr.com/640/480/business',2000);
select * from createProduct('Shoes','Shoes','DDF34',1000,'https://loremflickr.com/640/480/business',2000);
select * from createProduct('Shoes','Shoes','DDF34',1000,'https://loremflickr.com/640/480/business',2000);
