-- PSQL COMMANDS AND FUNCTIONS
-- tables

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'USER',
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
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

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
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

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  sale_date DATE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  cart_id INTEGER NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  items INTEGER NOT NULL,
  price FLOAT NOT NULL,
  total FLOAT NOT NULL
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
DECLARE
  last_user_id INTEGER;
BEGIN
  PERFORM u.id FROM users u WHERE u.email = $2 ;
  IF NOT found then
    INSERT INTO users (username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    SELECT currval('users_id_seq') INTO last_user_id;
    INSERT INTO carts (user_id,created_date) VALUES (last_user_id,now());
    INSERT INTO user_roles (user_id, role) VALUES (last_user_id, 'user');
    return last_user_id;
  else
    RETURN 0;
  end if;
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
DECLARE
  last_sale_id INTEGER;
begin
  IF $1 IN (select u.id from users u left join carts c on u.id = c.user_id inner join product_cart pc on c.id = pc.cart_id) THEN
    INSERT INTO orders (sale_date, user_id, cart_id, product_id, items, price, total)
      SELECT now(),uc.user_id, uc.cart_id, uc.product_id, uc.items, p.price, (p.price * uc.items) as total
      FROM public.products p
      LEFT JOIN (SELECT c.id AS cart_id, c.user_id, pc.product_id, pc.items FROM carts c LEFT JOIN product_cart pc ON c.id = pc.cart_id) uc ON p.id = uc.product_id
      WHERE uc.user_id = $1;
      SELECT currval('orders_id_seq') INTO last_sale_id;
      DELETE FROM product_cart WHERE cart_id = (SELECT DISTINCT c.id FROM carts c LEFT JOIN product_cart pc ON c.id = pc.cart_id WHERE c.user_id = $1);
	  RETURN last_sale_id;
  ELSE
    RETURN 0;
  END IF;
END;
$$ language plpgsql;



CREATE OR REPLACE FUNCTION createProduct(
  product_name TEXT,
  description TEXT,
  code TEXT,
  price FLOAT,
  photo TEXT,
  stock INTEGER,
  category TEXT
) RETURNS INTEGER AS
$$
DECLARE
  last_product_id INTEGER;
  category_id INTEGER;
BEGIN
  IF $7 IN (SELECT id FROM categories) THEN 
    SELECT id from categories WHERE name = $7 INTO category_id;
  ELSE
    SELECT id from categories WHERE name = 'default' INTO category_id;
  END IF

  INSERT INTO products (created_date, product_name, description, code, price, photo, category_id) 
    VALUES (now(),$1, $2, $3, $4, $5, category_id);
  SELECT currval('products_id_seq') INTO last_product_id;
  INSERT INTO product_stock (product_id, move_date, type_movement, quantity)
    VALUES (last_product_id, now(), 'IN', $6);
  RETURN last_product_id;
END;
$$ LANGUAGE PLPGSQL;

-- Users
select * from createUser('jorgem','jorge@gmail.com','jorge123','Jorge Molano','Calle de la casa',20,'+34',6123456789,'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');

select * from createUser('mariah','maria@gmail.com','maria123','Maria Hu','Calle',24,'+45',65484,'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');

-- products

insert into categories (name) values ('clothing');
insert into categories (name) values ('technology');

select * from createProduct('Shoes','Shoes','DDF36',1000,'https://loremflickr.com/640/480/business',2000, 'clothing');
select * from createProduct('Shirt','some shirt','DDF34',1000,'https://loremflickr.com/640/480/business',2000, 'clothing');
select * from createProduct('Computer','a super computer','DDF39',1000,'https://loremflickr.com/640/480/business',2000, 'technology');
select * from createProduct('TV','4k tv','DDF30',1000,'https://loremflickr.com/640/480/business',2000, 'technology');