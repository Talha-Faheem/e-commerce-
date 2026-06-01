# Multi-Vendor E-Commerce Platform

A complete Multi-Vendor E-Commerce Marketplace built with React.js, Node.js, Express.js, and MySQL. The platform allows multiple sellers to manage their stores, products, inventory, and orders while customers can browse products, place orders, manage wishlists, submit reviews, and track deliveries.

---

# Table of Contents

- Overview
- Features
- Technology Stack
- System Architecture
- Database Design
- User Roles
- Authentication & Authorization
- Core Functionalities
- API Modules
- Installation Guide
- Environment Variables
- Project Structure
- Database Schema
- Order Workflow
- Future Enhancements
- Security Features
- Screenshots
- Contributors
- License

---

# Overview

This project is a scalable multi-vendor marketplace designed to connect customers and sellers through a centralized platform.

The system supports:

- Customer Management
- Seller Management
- Product Catalog
- Inventory Tracking
- Shopping Cart
- Wishlist
- Checkout System
- Order Processing
- Product Reviews
- Notifications
- Payment Management

The platform follows a RESTful API architecture and uses JWT authentication for secure access.

---

# Features

## Customer Features

### Account Management

- Customer Registration
- Secure Login
- JWT Authentication
- Profile Management
- Address Management

### Shopping Experience

- Browse Products
- Search Products
- Filter Products
- View Product Details
- View Product Images
- Product Variants Selection

### Shopping Cart

- Add to Cart
- Update Quantity
- Remove Items
- View Cart Summary

### Wishlist

- Add Products to Wishlist
- Remove Products from Wishlist
- View Wishlist

### Orders

- Checkout Process
- Place Orders
- View Order History
- Track Orders
- View Order Details

### Reviews

- Rate Products
- Submit Reviews
- View Product Reviews

### Notifications

- Receive Order Updates
- Delivery Status Notifications

---

## Seller Features

### Seller Registration

- Seller Account Creation
- Seller Verification

### Seller Dashboard

- Dashboard Overview
- Sales Monitoring
- Order Monitoring

### Product Management

- Create Product
- Update Product
- Delete Product
- Upload Product Images
- Manage Product Variants

### Inventory Management

- Stock Tracking
- Inventory Updates

### Orders

- View Incoming Orders
- Update Order Status
- Manage Deliveries

### Banking Information

- Add Bank Details
- Update Bank Information

---

## Admin Features

### User Management

- Manage Customers
- Manage Sellers

### Product Management

- Manage Categories
- Monitor Products

### Order Monitoring

- View All Orders
- Manage Platform Operations

### Analytics

- Platform Statistics
- Revenue Monitoring

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- CSS

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Authentication

- JWT (JSON Web Token)
- bcrypt

## File Uploads

- Multer

## Development Tools

- Nodemon
- Git
- GitHub

---

# System Architecture

```text
Frontend (React.js)
        │
        ▼
REST API (Express.js)
        │
        ▼
Business Logic
        │
        ▼
MySQL Database
```

---

# User Roles

## Customer

Can:

- Browse products
- Add items to cart
- Place orders
- Submit reviews
- Manage profile

## Seller

Can:

- Add products
- Manage inventory
- Process orders
- View sales

## Admin

Can:

- Manage users
- Manage sellers
- Monitor products
- Monitor orders

---

# Authentication & Authorization

The platform uses JWT-based authentication.

### Authentication Process

1. User registers.
2. Password is hashed using bcrypt.
3. User logs in.
4. JWT token is generated.
5. Token is verified for protected routes.
6. User accesses authorized resources.

### Security Measures

- Password Hashing
- JWT Authentication
- Protected Routes
- Input Validation
- Role-Based Access Control

---

# Core Functionalities

## Product Catalog

Each product contains:

- Product Name
- Description
- Price
- Category
- Images
- Variants
- Inventory Information

## Cart Management

Customers can:

- Add Products
- Update Quantities
- Remove Products

## Wishlist Management

Customers can save products for future purchases.

## Checkout System

Checkout includes:

- Address Selection
- Order Creation
- Payment Record Creation

## Order Tracking

Customers can track:

- Pending
- Processing
- Shipped
- Delivered
- Cancelled

---

# API Modules

## Authentication APIs

### Customer Registration

```http
POST /register
```

### Login

```http
POST /login
```

---

## Product APIs

### Get Products

```http
GET /products
```

### Product Details

```http
GET /product/:id
```

### Create Product

```http
POST /product
```

### Update Product

```http
PUT /product/:id
```

### Delete Product

```http
DELETE /product/:id
```

---

## Cart APIs

### Get Cart

```http
GET /cart/:customerId
```

### Add Item

```http
POST /cart/add
```

### Remove Item

```http
DELETE /cart/remove/:id
```

---

## Wishlist APIs

### Add Wishlist Item

```http
POST /wishlist/add
```

### Get Wishlist

```http
GET /wishlist/:customerId
```

---

## Order APIs

### Create Order

```http
POST /checkout
```

### Customer Orders

```http
GET /orders/customer/:id
```

### Seller Orders

```http
GET /orders/seller/:id
```

### Update Status

```http
PUT /orders/status/:id
```

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/multivendor-ecommerce.git
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce

JWT_SECRET=your_jwt_secret
```

Run server:

```bash
npm start
```

or

```bash
nodemon server.js
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

---

# Environment Variables

```env
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=ecommerce

JWT_SECRET=your_secret_key
```

---

# Project Structure

```text
MultiVendor-Ecommerce/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Assets/
│   │   ├── Context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── uploads/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── database/
│   └── ecommerce.sql
│
├── README.md
│
└── .env
```

---

# Database Schema

## User Management

### roles

Stores user roles.

### user_status

Stores account statuses.

### users

Stores platform users.

---

## Seller Management

### sellers

Stores seller information.

### seller_banks

Stores seller banking details.

---

## Customer Management

### customers

Stores customer information.

### addresses

Stores shipping addresses.

---

## Product Management

### categories

Stores categories.

### products

Stores product information.

### product_variants

Stores product variants.

### inventory

Stores stock information.

### product_images

Stores product images.

---

## Shopping Features

### carts

Customer carts.

### cart_items

Items inside carts.

### wishlists

Customer wishlists.

### wishlist_items

Wishlist products.

---

## Order Management

### orders

Order records.

### order_items

Products inside orders.

### payments

Payment records.

---

## Customer Engagement

### reviews

Product reviews.

### notifications

System notifications.

---

# Order Workflow

```text
Customer
   │
   ▼
Browse Products
   │
   ▼
Add To Cart
   │
   ▼
Checkout
   │
   ▼
Create Order
   │
   ▼
Payment Record
   │
   ▼
Seller Receives Order
   │
   ▼
Order Processing
   │
   ▼
Shipping
   │
   ▼
Delivery
```

---

# Future Enhancements

### Payments

- Stripe Integration
- PayPal Integration
- JazzCash
- EasyPaisa

### Customer Experience

- Product Recommendations
- AI Search
- Recently Viewed Products

### Seller Features

- Advanced Analytics
- Revenue Reports
- Inventory Forecasting

### Communication

- Real-Time Notifications
- Live Chat
- Email Notifications

### Mobile

- Android App
- iOS App

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Secure REST APIs
- Role-Based Access Control
- Input Validation
- SQL Injection Prevention
- Protected Routes
- CORS Protection

---

# Screenshots

Add screenshots of:

- Home Page
- Product Page
- Product Detail Page
- Cart
- Wishlist
- Checkout
- Seller Dashboard
- Order Management

Example:

```markdown
![Home Page](screenshots/home.png)

![Product Detail](screenshots/product-detail.png)

![Seller Dashboard](screenshots/seller-dashboard.png)
```

---

# Contributors

### Talha Faheem

BS Software Engineering

Full Stack Developer

Specialization:

- React.js
- Node.js
- Express.js
- MySQL

---

# License

This project is developed for educational, portfolio, and commercial learning purposes.

Copyright © 2026 Talha Faheem

All Rights Reserved.
