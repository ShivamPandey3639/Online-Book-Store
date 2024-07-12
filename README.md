# Online Book Store

An online platform for browsing and purchasing books. The project is built using Node.js, Express.js, MySQL, and EJS templates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Features

- Browse available books
- Search for books by name
- Add books to cart
- Checkout and place orders
- Admin login for managing books
- Customer registration and login

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MySQL](https://www.mysql.com/)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/online-book-store.git
    cd online-book-store
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    - Create a database named `book_bazzar20`.
    - Import the provided SQL schema to create tables.
    - Update the database connection settings in `index.js`:

        ```javascript
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'book_bazzar20'
        }).promise();
        ```

4. Start the server:

    ```bash
    node index.js
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Customer

- **Registration:** Navigate to `/register` and fill out the registration form.
- **Login:** Navigate to `/login` and enter your credentials.
- **Browse Books:** After logging in, browse the available books on the homepage.
- **Search Books:** Use the search bar to find books by name.
- **Add to Cart:** Add books to your cart by specifying the quantity.
- **Checkout:** Proceed to checkout to see the order summary and place the order.

### Admin

- **Login:** Navigate to `/admin-login` and enter the admin credentials.
- **Manage Books:** Add, edit, or remove books from the inventory.
- **View Customers:** See the list of registered customers.

## Routes

### GET

- `/` - Home page
- `/register` - Registration page
- `/admin-login` - Admin login page

### POST

- `/submit` - Customer login
- `/submit2` - Admin login
- `/register` - Customer registration
- `/search` - Search for books
- `/add-to-cart` - Add books to cart
- `/checkout` - Checkout and place order
- `/place-order` - Confirm order
- `/remove-book` - Remove a book (Admin)
- `/edit-book` - Edit a book (Admin)
- `/add-book` - Add a new book (Admin)
- `/see-customer` - View customers (Admin)

## Screenshots

* Add screenshots of your application here.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

