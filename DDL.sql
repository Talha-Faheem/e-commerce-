CREATE DATABASE ecommerce_platform; 
USE ecommerce_platform; 
CREATE TABLE roles ( 
id INT PRIMARY KEY AUTO_INCREMENT, 
role_name VARCHAR(50) NOT NULL UNIQUE 
); 
CREATE TABLE user_status ( 
id INT PRIMARY KEY AUTO_INCREMENT, 
    status_name VARCHAR(50) NOT NULL UNIQUE 
); 
 
CREATE TABLE users ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(150) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(20) NOT NULL, 
    profile_image VARCHAR(255), 
    role_id INT NOT NULL, 
    status_id INT NOT NULL, 
    last_login TIMESTAMP NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
 
    CONSTRAINT fk_users_role 
        FOREIGN KEY (role_id) REFERENCES roles(id), 
 
    CONSTRAINT fk_users_status 
        FOREIGN KEY (status_id) REFERENCES user_status(id) 
); 
 
CREATE TABLE sellers ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL UNIQUE, 
    shop_name VARCHAR(150) NOT NULL, 
    shop_logo VARCHAR(255), 
    shop_banner VARCHAR(255), 
    shop_description TEXT, 
    cnic VARCHAR(30) NOT NULL UNIQUE, 
    is_verified BOOLEAN DEFAULT FALSE, 
    rating DECIMAL(3,2) DEFAULT 0, 
    total_sales INT DEFAULT 0, 
 
    CONSTRAINT chk_seller_rating 
        CHECK (rating >= 0 AND rating <= 5), 
 
    CONSTRAINT fk_sellers_user 
        FOREIGN KEY (user_id) REFERENCES users(id) 
); 
 
CREATE TABLE seller_banks ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    seller_id INT NOT NULL, 
    bank_name VARCHAR(100) NOT NULL, 
    account_number VARCHAR(100) NOT NULL UNIQUE, 
    iban VARCHAR(100) UNIQUE, 
    account_title VARCHAR(100) NOT NULL, 
 
    CONSTRAINT fk_seller_banks_seller 
        FOREIGN KEY (seller_id) REFERENCES sellers(id) 
); 
 
CREATE TABLE customers ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL UNIQUE, 
    loyalty_points INT DEFAULT 0, 
 
    CONSTRAINT chk_loyalty_points 
        CHECK (loyalty_points >= 0), 
 
    CONSTRAINT fk_customers_user 
        FOREIGN KEY (user_id) REFERENCES users(id) 
); 
 
CREATE TABLE categories ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL, 
    slug VARCHAR(150) NOT NULL UNIQUE, 
    image VARCHAR(255), 
    description TEXT, 
    status VARCHAR(50) NOT NULL 
); 
 
CREATE TABLE products ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    seller_id INT NOT NULL, 
    category_id INT NOT NULL, 
    name VARCHAR(150) NOT NULL, 
    slug VARCHAR(200) NOT NULL UNIQUE, 
    description TEXT, 
    price DECIMAL(10,2) NOT NULL, 
    discount_price DECIMAL(10,2), 
    thumbnail VARCHAR(255), 
    status VARCHAR(50) NOT NULL, 
 
    CONSTRAINT chk_product_price 
        CHECK (price > 0), 
 
    CONSTRAINT chk_discount_price 
        CHECK (discount_price >= 0), 
 
    CONSTRAINT fk_products_seller 
        FOREIGN KEY (seller_id) REFERENCES sellers(id), 
 
    CONSTRAINT fk_products_category 
        FOREIGN KEY (category_id) REFERENCES categories(id) 
); 
 
CREATE TABLE product_variants ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    product_id INT NOT NULL, 
    size VARCHAR(50), 
    color VARCHAR(50), 
    sku VARCHAR(100) NOT NULL UNIQUE, 
    price DECIMAL(10,2) NOT NULL, 
    stock INT NOT NULL, 
 
    CONSTRAINT chk_variant_price 
        CHECK (price > 0), 
 
    CONSTRAINT chk_variant_stock 
        CHECK (stock >= 0), 
 
    CONSTRAINT fk_product_variants_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
); 
 
CREATE TABLE inventory ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    product_id INT NOT NULL, 
    stock INT NOT NULL, 
    reserved_stock INT DEFAULT 0, 
    warehouse_location VARCHAR(255), 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE 
CURRENT_TIMESTAMP, 
 
    CONSTRAINT chk_inventory_stock 
        CHECK (stock >= 0), 
 
    CONSTRAINT chk_reserved_stock 
        CHECK (reserved_stock >= 0), 
 
    CONSTRAINT fk_inventory_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
); 
 
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_data LONGBLOB NOT NULL,
    image_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id) REFERENCES products(id)
);
 
CREATE TABLE addresses ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL, 
    full_name VARCHAR(100) NOT NULL, 
    phone VARCHAR(20) NOT NULL, 
    country_id INT NOT NULL, 
    province_id INT NOT NULL, 
    city_id INT NOT NULL, 
    postal_code VARCHAR(20), 
    address_line_1 VARCHAR(255) NOT NULL, 
    address_line_2 VARCHAR(255), 
    landmark VARCHAR(255), 
    address_type VARCHAR(50) NOT NULL, 
 
    CONSTRAINT fk_addresses_user 
        FOREIGN KEY (user_id) REFERENCES users(id) 
); 
 
CREATE TABLE carts ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    customer_id INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 
    CONSTRAINT fk_carts_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(id) 
); 
 
CREATE TABLE cart_items ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    cart_id INT NOT NULL, 
    product_id INT NOT NULL, 
    quantity INT NOT NULL, 
 
    CONSTRAINT chk_cart_quantity 
        CHECK (quantity > 0), 
 
    CONSTRAINT fk_cart_items_cart 
        FOREIGN KEY (cart_id) REFERENCES carts(id), 
 
    CONSTRAINT fk_cart_items_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
); 
 
CREATE TABLE wishlists ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    customer_id INT NOT NULL, 
 
    CONSTRAINT fk_wishlists_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(id) 
); 
 
CREATE TABLE wishlist_items ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    wishlist_id INT NOT NULL, 
    product_id INT NOT NULL, 
 
    CONSTRAINT fk_wishlist_items_wishlist 
        FOREIGN KEY (wishlist_id) REFERENCES wishlists(id), 
 
    CONSTRAINT fk_wishlist_items_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
); 
 
CREATE TABLE orders ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    customer_id INT NOT NULL, 
    address_id INT NOT NULL, 
    order_number VARCHAR(100) NOT NULL UNIQUE, 
    subtotal DECIMAL(10,2) NOT NULL, 
    shipping_fee DECIMAL(10,2) DEFAULT 0, 
    tax DECIMAL(10,2) DEFAULT 0, 
    discount DECIMAL(10,2) DEFAULT 0, 
    total_amount DECIMAL(10,2) NOT NULL, 
    payment_method_id INT NOT NULL, 
    payment_status_id INT NOT NULL, 
    order_status_id INT NOT NULL, 
 
    CONSTRAINT chk_order_total 
        CHECK (total_amount >= 0), 
 
    CONSTRAINT fk_orders_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(id), 
 
    CONSTRAINT fk_orders_address 
        FOREIGN KEY (address_id) REFERENCES addresses(id) 
); 
 
CREATE TABLE order_items ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    order_id INT NOT NULL, 
    product_id INT NOT NULL, 
    seller_id INT NOT NULL, 
    quantity INT NOT NULL, 
    price DECIMAL(10,2) NOT NULL, 
    subtotal DECIMAL(10,2) NOT NULL, 
 
    CONSTRAINT chk_order_quantity 
        CHECK (quantity > 0), 
 
    CONSTRAINT chk_order_price 
        CHECK (price > 0), 
 
    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) REFERENCES orders(id), 
 
    CONSTRAINT fk_order_items_product 
        FOREIGN KEY (product_id) REFERENCES products(id), 
 
    CONSTRAINT fk_order_items_seller 
        FOREIGN KEY (seller_id) REFERENCES sellers(id) 
); 
 
CREATE TABLE payments ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    order_id INT NOT NULL, 
    transaction_id VARCHAR(150) NOT NULL UNIQUE, 
    payment_method_id INT NOT NULL, 
    amount DECIMAL(10,2) NOT NULL, 
    payment_status_id INT NOT NULL, 
 
    CONSTRAINT chk_payment_amount 
        CHECK (amount > 0), 
 
    CONSTRAINT fk_payments_order 
        FOREIGN KEY (order_id) REFERENCES orders(id) 
); 
 
CREATE TABLE reviews ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    customer_id INT NOT NULL, 
    product_id INT NOT NULL, 
    rating INT NOT NULL, 
    comment TEXT, 
 
    CONSTRAINT chk_review_rating 
        CHECK (rating >= 1 AND rating <= 5), 
 
    CONSTRAINT uq_customer_product_review 
        UNIQUE(customer_id, product_id), 
 
    CONSTRAINT fk_reviews_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(id), 
 
    CONSTRAINT fk_reviews_product 
        FOREIGN KEY (product_id) REFERENCES products(id) 
); 
 
CREATE TABLE notifications ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    message TEXT NOT NULL, 
    type VARCHAR(50) NOT NULL, 
    is_read BOOLEAN DEFAULT FALSE, 
 
    CONSTRAINT fk_notifications_user 
        FOREIGN KEY (user_id) REFERENCES users(id) 
); 
