require("dotenv").config();
const userControllers = require("./controllers/userController");
const productControllers = require("./controllers/productController");
const express = require("express");
const pool = require("./db");
const app = express();

app.use(express.json());

app.get("/createUserTable", async (req, res) => {
  try {
    const data = await pool.query(
      "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(20), email VARCHAR(50), password VARCHAR(50))"
    );
    if (!data) return res.status(400).json("Something went wrong");
    res.status(200).json("Table created successfuly");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

app.get("/createProductTable", async (req, res) => {
  try {
    const data = await pool.query(
      "CREATE TABLE products (p_id SERIAL PRIMARY KEY, name VARCHAR(20), price int, description text, owner int not null, foreign key (owner) references users(id))"
    );
    if (!data) return res.status(400).json("Something went wrong");
    res.status(200).json("Product Table created successfuly");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

app.use("/api/v1/user", userControllers);
app.use("/api/v1/product", productControllers);

pool.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });
});
