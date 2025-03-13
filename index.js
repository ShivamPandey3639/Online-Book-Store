import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var search = "";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).render("error.ejs", {
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// Database connection
const db = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "PHW#84#jeor",
    database: "book_bazzar",
  })
  .promise();

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Registration page
app.get("/register", (req, res) => {
  res.render("index2.ejs");
});

// Admin login page
app.get("/admin-login", (req, res) => {
  res.render("index8.ejs");
});

// Admin credentials
const Admin_name = "ShivamPandey";
const pswd = "1234";

// Admin login handler
app.post("/submit2", async (req, res) => {
  try {
    const name = req.body.namess;
    const pwd = req.body.passwords;

    if (Admin_name == name && pswd == pwd) {
      const [books] = await db.query(
        "SELECT Book_name, Quantity, Price, Book_Id FROM book"
      );
      res.render("index9.ejs", { books: [books] });
    } else {
      res.send(
        `<script>alert('Wrong Password or Name! Try again'); window.location.href = '/admin-login';</script>`
      );
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    res
      .status(500)
      .send(
        `<script>alert('Database error. Please try again later.'); window.location.href = '/admin-login';</script>`
      );
  }
});

// View customers (admin)
app.post("/see-customer", async (req, res) => {
  try {
    const [customers] = await db.query(
      "SELECT Customer_name, customer_email, Customer_contact FROM customer"
    );
    res.render("index10.ejs", { books: [customers] });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error fetching customer data'); window.history.back();</script>`
      );
  }
});

// Remove book (admin)
app.post("/remove-book", async (req, res) => {
  try {
    const bookId = req.body.bookid;
    console.log(bookId + " - removing book");
    await db.query("DELETE FROM book WHERE Book_Id = ?", [bookId]);
    const [books] = await db.query(
      "SELECT Book_name, Quantity, Price, Book_Id FROM book"
    );
    res.render("index9.ejs", { books: [books] });
  } catch (error) {
    console.error("Error removing book:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error removing book'); window.history.back();</script>`
      );
  }
});

// Edit book (admin)
app.post("/edit-book", async (req, res) => {
  try {
    const bookname = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;

    if (quantity < 100) {
      console.log(bookname + " has less than 100 copies");
    }

    await db.query(
      "UPDATE book SET Quantity = ?, Price = ? WHERE Book_name = ?",
      [quantity, price, bookname]
    );

    const [books] = await db.query(
      "SELECT Book_name, Quantity, Price, Book_Id FROM book"
    );

    res.render("index9.ejs", { books: [books] });
  } catch (error) {
    console.error("Error editing book:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error updating book information'); window.history.back();</script>`
      );
  }
});

// Add book (admin)
app.post("/add-book", async (req, res) => {
  try {
    const bookname = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const auth = req.body.author;

    await db.query(
      "INSERT INTO book(Book_name, Quantity, Author, Price) VALUES (?, ?, ?, ?)",
      [bookname, quantity, auth, price]
    );

    const [books] = await db.query(
      "SELECT Book_name, Quantity, Price, Book_Id FROM book"
    );

    res.render("index9.ejs", { books: [books] });
    console.log("Book added successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error adding book'); window.history.back();</script>`
      );
  }
});

// User login
let user = "";
app.post("/submit", async (req, res) => {
  const re = req.body.usernamess;
  user = re;
  console.log(user);
  let isConditionSatisfied = false;

  try {
    const [customers] = await db.query("SELECT * FROM customer");
    const [books] = await db.query("SELECT * FROM book");

    for (const customer of customers) {
      if (customer.Customer_name === re) {
        res.render("index3.ejs", { books: [books], search: search });
        isConditionSatisfied = true;
        break;
      }
    }

    if (!isConditionSatisfied) {
      res.render("index4.ejs");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error during login. Please try again.'); window.location.href = '/';</script>`
      );
  }
});

// User registration
app.post("/register", async (req, res) => {
  try {
    const username = req.body["new-username"];
    const email = req.body["new-email"];
    const contact = req.body["new-contact"];
    const r = "N/A"; // Default address
    const rand_var = 0; // Default pincode

    await db.query(
      "INSERT INTO customer(Customer_name, Customer_contact, Customer_email, Customer_addr, Customer_state, Customer_pincode) VALUES (?, ?, ?, ?, ?, ?)",
      [username, contact, email, r, r, rand_var]
    );

    // Render the successful registration page
    res.render("index5.ejs");
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .send(
        `<script>alert('Registration failed. Please try again.'); window.location.href = '/register';</script>`
      );
  }
});

// Redirect to login
app.get("/login", (req, res) => {
  res.redirect("/"); // Redirect to the login page
});

// Search books
app.post("/search", async (req, res) => {
  try {
    const searchQuery = req.body.query;
    const [books] = await db.query(
      "SELECT * FROM book WHERE Book_name LIKE ?",
      ["%" + searchQuery + "%"]
    );
    res.render("index3.ejs", { books: [books], search: searchQuery });
  } catch (error) {
    console.error("Error searching for books:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error searching for books'); window.history.back();</script>`
      );
  }
});

// Cart management
var order = [];
var book_id;
let bookIdsArray = [];
let quantityArray = [];

// Add to cart
app.post("/add-to-cart", async (req, res) => {
  try {
    const book_id2 = req.body["bookid"];
    const quantity = parseInt(req.body["quantity"]);

    // Check if book exists and has enough quantity
    const [book] = await db.query("SELECT * FROM book WHERE Book_Id = ?", [
      book_id2,
    ]);

    if (!book || book.length === 0) {
      return res.send(
        `<script>alert('Book not found!'); window.history.back();</script>`
      );
    }

    if (quantity > book[0].Quantity) {
      return res.send(
        `<script>alert('Only ${book[0].Quantity} books available!'); window.history.back();</script>`
      );
    }

    // Add to cart
    quantityArray.push(quantity);
    bookIdsArray.push(book_id2);

    res.send(`<script>
      alert('Book added to cart successfully');
      // Update cart count in localStorage if using the new UI
      const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
      localStorage.setItem('cartCount', currentCount + 1);
      window.history.back();
    </script>`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error adding book to cart'); window.history.back();</script>`
      );
  }
});

// Checkout
app.post("/checkout", async (req, res) => {
  let price = 0;

  try {
    if (bookIdsArray.length !== 0) {
      const placeholders = bookIdsArray.map(() => "?").join(",");
      const [books] = await db.query(
        `SELECT * FROM book WHERE Book_Id IN (${placeholders})`,
        bookIdsArray
      );
      order = [books];

      for (let i = 0; i < bookIdsArray.length; i++) {
        const [book] = await db.query("SELECT * FROM book WHERE Book_Id = ?", [
          bookIdsArray[i],
        ]);
        if (book && book.length > 0) {
          price = price + quantityArray[i] * book[0].Price;
        }
      }

      const x = bookIdsArray.slice();
      const y = quantityArray.slice();

      res.render("index6.ejs", {
        order: order,
        quantityArray: quantityArray,
        price: price,
      });

      // Clear cart after checkout
      bookIdsArray = [];
      quantityArray = [];
    } else {
      // Empty cart
      res.render("index6.ejs", {
        order: [],
        quantityArray: [],
        price: 0,
      });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error processing checkout'); window.location.href = '/';</script>`
      );
  }
});

// Place order
app.post("/place-order", async (req, res) => {
  try {
    // Process the order
    for (let i = 0; i < bookIdsArray.length; i++) {
      const [book] = await db.query("SELECT * FROM book WHERE Book_Id = ?", [
        bookIdsArray[i],
      ]);

      if (book && book.length > 0) {
        const ordered_quant = book[0].Quantity;

        // Update book quantity
        await db.query("UPDATE book SET Quantity = ? WHERE Book_Id = ?", [
          ordered_quant - quantityArray[i],
          bookIdsArray[i],
        ]);

        // TODO: Add order to purchase history
      }
    }

    // Clear cart
    bookIdsArray = [];
    quantityArray = [];

    // Show order confirmation
    res.render("index7.ejs");
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error placing order'); window.location.href = '/';</script>`
      );
  }
});

// Continue shopping
app.post("/continue", async (req, res) => {
  try {
    const [customers] = await db.query("SELECT * FROM customer");
    const [books] = await db.query("SELECT * FROM book");

    let foundUser = false;
    for (const customer of customers) {
      if (customer.Customer_name === user) {
        res.render("index3.ejs", { books: [books], search: search });
        foundUser = true;
        break;
      }
    }

    if (!foundUser) {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error continuing shopping:", error);
    res
      .status(500)
      .send(
        `<script>alert('Error loading books'); window.location.href = '/';</script>`
      );
  }
});

// Error page
app.get("/error", (req, res) => {
  res.render("error.ejs", {
    message: "Page not found",
    error: "The requested page does not exist.",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("error.ejs", {
    message: "Page not found",
    error: "The requested page does not exist.",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Visit http://localhost:${port} to access Book Bazaar`);
});
