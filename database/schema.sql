-- Book Bazaar Database Schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS book_bazzar;

-- Use the database
USE book_bazzar;

-- Create customer table
CREATE TABLE IF NOT EXISTS customer (
  Customer_id INT AUTO_INCREMENT PRIMARY KEY,
  Customer_name VARCHAR(100) NOT NULL,
  Customer_contact VARCHAR(20) NOT NULL,
  Customer_email VARCHAR(100) NOT NULL,
  Customer_addr VARCHAR(255) DEFAULT 'N/A',
  Customer_state VARCHAR(50) DEFAULT 'N/A',
  Customer_pincode INT DEFAULT 0,
  Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create book table
CREATE TABLE IF NOT EXISTS book (
  Book_Id INT AUTO_INCREMENT PRIMARY KEY,
  Book_name VARCHAR(255) NOT NULL,
  Author VARCHAR(100) DEFAULT 'Unknown',
  Quantity INT NOT NULL DEFAULT 0,
  Price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  Description TEXT,
  Cover_image VARCHAR(255) DEFAULT 'default_cover.jpg',
  Category VARCHAR(50) DEFAULT 'General',
  Added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  Order_id INT AUTO_INCREMENT PRIMARY KEY,
  Customer_id INT NOT NULL,
  Order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  Status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  FOREIGN KEY (Customer_id) REFERENCES customer(Customer_id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  Item_id INT AUTO_INCREMENT PRIMARY KEY,
  Order_id INT NOT NULL,
  Book_Id INT NOT NULL,
  Quantity INT NOT NULL DEFAULT 1,
  Price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (Order_id) REFERENCES orders(Order_id),
  FOREIGN KEY (Book_Id) REFERENCES book(Book_Id)
);

-- Insert sample data for books
INSERT INTO book (Book_name, Author, Quantity, Price, Description, Category) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 150, 12.99, 'A classic novel about the American Dream set in the Jazz Age.', 'Fiction'),
('To Kill a Mockingbird', 'Harper Lee', 200, 14.99, 'A powerful story of racial injustice and moral growth in the American South.', 'Fiction'),
('1984', 'George Orwell', 175, 11.99, 'A dystopian novel about totalitarianism and surveillance.', 'Science Fiction'),
('Pride and Prejudice', 'Jane Austen', 120, 9.99, 'A romantic novel about societal expectations and personal growth.', 'Romance'),
('The Hobbit', 'J.R.R. Tolkien', 250, 16.99, 'A fantasy adventure about a hobbit who joins a quest to reclaim treasure.', 'Fantasy'),
('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 300, 19.99, 'The first book in the Harry Potter series about a young wizard.', 'Fantasy'),
('The Catcher in the Rye', 'J.D. Salinger', 130, 10.99, 'A novel about teenage alienation and identity.', 'Fiction'),
('The Lord of the Rings', 'J.R.R. Tolkien', 180, 24.99, 'An epic fantasy trilogy about the quest to destroy a powerful ring.', 'Fantasy'),
('The Alchemist', 'Paulo Coelho', 220, 13.99, 'A philosophical novel about following one\'s dreams.', 'Fiction'),
('Brave New World', 'Aldous Huxley', 140, 12.99, 'A dystopian novel about a genetically engineered future society.', 'Science Fiction');

-- Insert sample customer data
INSERT INTO customer (Customer_name, Customer_contact, Customer_email, Customer_addr, Customer_state, Customer_pincode) VALUES
('John Doe', '555-123-4567', 'john.doe@example.com', '123 Main St', 'California', 90210),
('Jane Smith', '555-987-6543', 'jane.smith@example.com', '456 Oak Ave', 'New York', 10001),
('Robert Johnson', '555-456-7890', 'robert.johnson@example.com', '789 Pine Rd', 'Texas', 75001);

-- Create admin user (if needed in the future)
-- CREATE TABLE IF NOT EXISTS admin (
--   Admin_id INT AUTO_INCREMENT PRIMARY KEY,
--   Username VARCHAR(50) NOT NULL UNIQUE,
--   Password VARCHAR(255) NOT NULL,
--   Email VARCHAR(100) NOT NULL,
--   Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO admin (Username, Password, Email) VALUES
 