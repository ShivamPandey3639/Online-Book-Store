import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
var search = "";


app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book_bazzar20'
}).promise()


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("index2.ejs"); // Render the registration page
});
app.get("/admin-login",(req,res)=>{
  res.render("index8.ejs");
});
const Admin_name="ShivamPandey";
const pswd="1234";
app.post("/submit2",async (req,res)=>{
    const name=req.body.namess;
    const pwd=req.body.passwords;
    
    if(Admin_name==name && pswd==pwd){
      const books = await db.query("SELECT Book_name, Quantity,Price,Book_Id FROM book");
      res.render("index9.ejs",{books: books});
    }else{
      res.send(`<script>alert('Wrong Password or Name! Try again');</script>`);
    }
    
})

app.post("/see-customer",async (req,res)=>{
  
  
  
  const books = await db.query("SELECT Customer_name, customer_email,Customer_contact FROM customer");
  res.render("index10.ejs",{books: books});
  
  
})
app.post("/remove-book",async (req,res)=>{
  
  const bookId=req.body.bookid;
  console.log(bookId+"eereeeeeeeeee");
  db.query('DELETE FROM book WHERE Book_Id = ?',[bookId]);
  const books = await db.query("SELECT Book_name, Quantity,Price,Book_Id FROM book");
  res.render("index9.ejs",{books: books});

})
app.post("/edit-book",async (req,res)=>{
  
  const bookname=req.body.name;
  const quantity=req.body.quantity;
  const price=req.body.price;
  if(quantity<100){
    console.log(bookname+"have less than 100 copies");
  }
  
  await db.query("UPDATE book SET Quantity = ?, Price = ? WHERE Book_name = ?", [quantity, price,bookname ]);
  const books = await db.query("SELECT Book_name, Quantity,Price,Book_Id FROM book");
  res.render("index9.ejs",{books: books});
  

})
app.post("/add-book",async (req,res)=>{
  
  const bookname=req.body.name;
  const quantity=req.body.quantity;
  const price=req.body.price;
  const auth=req.body.author;
  await db.query("INSERT INTO book(Book_name,Quantity,Author,Price) VALUES (?, ?, ?, ?)", [bookname,quantity,auth,price]);
  const books = await db.query("SELECT Book_name, Quantity,Price,Book_Id FROM book");
  res.render("index9.ejs",{books: books});
  console.log("book Added succesfully");

})

let user = "";
app.post("/submit", async (req, res) => {
  const re = req.body.usernamess;
  user = re;
  console.log(user);
  let isConditionSatisfied = false;
  try {
    const results = await db.query("SELECT * FROM customer");
    const books = await db.query("SELECT * FROM book");
    console.log(books);


    results.forEach((row, i) => {
      row.forEach((element, j) => {

        console.log(element.Customer_name);
        if (element.Customer_name == re) {
          res.render("index3.ejs", { books: books, search: search });

          isConditionSatisfied = true;

        }

      });
    });


  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data from database");
  }
  if (!isConditionSatisfied) {
    res.render("index4.ejs");
  }
});



app.post('/register', async (req, res) => {

  const username = req.body['new-username'];
  const email = req.body["new-email"];
  const contact = req.body["new-contact"];
  const r = "shut";
  const rand_var = 3;

  try {
    await db.query("INSERT INTO customer(Customer_name,Customer_contact,Customer_email,Customer_addr,Customer_state,Customer_pincode) VALUES (?, ?, ?, ?, ?, ?)", [username, contact, email, r, r, rand_var]);
    // Render the successful registration page
    res.render('index5.ejs');
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data from database");
  }

});

app.get('/login', (req, res) => {
  res.redirect("/login"); // Redirect to the login page
});



app.post("/search", async (req, res) => {
  try {
    const searchQuery = req.body.query;
    const books = await db.query("SELECT * FROM book WHERE Book_name LIKE ?", ['%'+searchQuery+'%']);
    res.render("index3.ejs", { books: books, search: searchQuery });
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).send("Error searching for books");
  }
});

var order = [];
var book_id;
let bookIdsArray = [];
let quantityArray = [];
app.post("/add-to-cart", async (req, res) => {
  const book_id2 = req.body["bookid"];
  
  const quantity = req.body["quantity"];
  
  if(quantity>200){
    res.send(`<script>alert('${quantity} books not available!');</script>`);
  }else{
    res.send(`<script>alert('Book added to cart successfully');</script>`);
    quantityArray.push(quantity);
    bookIdsArray.push(book_id2);
  }
  


});

let x = [];
let y = [];
app.post("/checkout", async (req, res) => {
  let price = 0;


  try {
    if (bookIdsArray.length != 0) {
      order = await db.query("SELECT * FROM book WHERE Book_Id IN (?)", [bookIdsArray]);

    }
    for (let i = 0; i < bookIdsArray.length; i++) {
      const help = await db.query("SELECT * FROM book WHERE Book_Id = ?", [bookIdsArray[i]]);
      price = price + quantityArray[i] * help[0][0].Price;
    }
    console.log(price);
    console.log(order);
    x = bookIdsArray.slice();
    y = quantityArray.slice();
    
    res.render("index6.ejs", { order: order, quantityArray: quantityArray, price: price });
    bookIdsArray.splice(0, bookIdsArray.length);
    quantityArray.splice(0, quantityArray.length);

  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data from database");
  }

});

app.post("/place-order", async (req, res) => {
  console.log(x);
  console.log(y);
  const customer=await db.query("SELECT * FROM customer");
  for (let i = 0; i < x.length; i++) {
    const help = await db.query("SELECT * FROM book WHERE Book_Id = ?", [x[i]]);
    
    let ordered_quant = help[0][0].Quantity;
    console.log(ordered_quant);
    console.log(x);
    console.log(y);
    await db.query("UPDATE book SET Quantity = ? WHERE Book_Id = ?", [ordered_quant - y[i], x[i]]);
  }
  // console.log(customer);
  // for(let i=0;i<customer.length;i++){
  //   for(let k=0;k<customer.length;k++){
    
  //     if(customer[i][k].Customer_name==user){
  //       console.log(customer[i].Customer_ID+"SSDSSDSSS");
  //       for(let j=0;j<x.length;j++){
  //         await db.query("UPDATE purchase SET Quantity = ?, Book_Id=? , WHERE Customer_Id = ?",[y[j],x[j],customer[i].Customer_ID]);
  //       }
  //   }
  // }


  res.render("index7.ejs");
});

app.post("/continue", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM customer");
    const books = await db.query("SELECT * FROM book");


    results.forEach((row, i) => {
      row.forEach((element, j) => {

        console.log(element.Customer_name);
        if (element.Customer_name == user) {
          res.render("index3.ejs", { books: books, search: search });

        }

      });
    });


  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data from database");
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
