const pool = require("../db");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, owner } = req.body;
    await pool.query(
      `insert into products(name, price, description, owner) values($1, $2, $3, $4)`,
      [name, price, description, owner],
      (err, result) => {
        if (err) return res.status(400).json(result);
        else
          return res
            .status(201)
            .json(
              result.rowCount == 1
                ? "product created successfuly"
                : "product denied"
            );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error while adding product");
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await pool.query(`SELECT * FROM products`);
    return res.status(200).json(products.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addProduct, allProducts };
