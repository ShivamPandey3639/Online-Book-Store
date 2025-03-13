# Book Bazaar - Online Bookstore  ![image](https://github.com/user-attachments/assets/f9478a38-9781-432a-b1a5-62cce2620915)


Book Bazaar is a modern, responsive online bookstore application built with Node.js, Express, and MySQL. It provides a user-friendly interface for customers to browse, search, and purchase books, as well as an admin dashboard for managing inventory and customers.



## Features

### Customer Features

- User registration and login
- Browse books with filtering options
- Search functionality
- Shopping cart management
- Checkout process
- Order history

### Admin Features

- Secure admin login
- Dashboard with statistics
- Book inventory management (add, edit, remove)
- Customer management
- Order tracking

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templates
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Libraries**:
  - body-parser: For parsing request bodies
  - mysql2: For MySQL database connection

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Database Setup

1. Create a MySQL database named `book_bazzar`
2. Import the database schema from the `database/schema.sql` file:
   ```
   mysql -u your_username -p book_bazzar < database/schema.sql
   ```

### Application Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/book-bazaar.git
   cd book-bazaar
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure the database connection in `index.js`:

   ```javascript
   const db = mysql
     .createConnection({
       host: "localhost",
       user: "your_username",
       password: "your_password",
       database: "book_bazzar",
     })
     .promise();
   ```

4. Start the application:

   ```
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Project Structure

```
book-bazaar/
├── index.js                # Main application file
├── package.json            # Project dependencies
├── public/                 # Static assets
│   ├── images/             # Image assets
│   └── styles.css          # Global CSS styles
├── views/                  # EJS templates
│   ├── index.ejs           # Home/Login page
│   ├── index2.ejs          # Registration page
│   ├── index3.ejs          # Book listing page
│   ├── index6.ejs          # Shopping cart page
│   ├── index7.ejs          # Order confirmation page
│   ├── index8.ejs          # Admin login page
│   ├── index9.ejs          # Admin dashboard
│   ├── index10.ejs         # Customer management page
│   └── error.ejs           # Error page
└── database/               # Database scripts
    └── schema.sql          # Database schema
```

## Usage

### Customer Access

1. Visit the homepage and register a new account
2. Login with your credentials
3. Browse or search for books
4. Add books to your cart
5. Proceed to checkout

### Admin Access

1. Visit `/admin-login`
2. Login with admin credentials (default: username: `ShivamPandey`, password: `1234`)
3. Manage books, view customers, and monitor statistics

## Improvements and Future Features

- User profile management
- Advanced search and filtering
- Payment gateway integration
- Order tracking
- Email notifications
- Mobile app version
- Analytics dashboard
- Recommendation system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [MySQL](https://www.mysql.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
