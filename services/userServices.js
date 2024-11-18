const pool = require("../db");

const allusers = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM users`);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong in alluser function");
  }
};

const adduser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const insert_query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
    await pool.query(insert_query, [name, email, password], (err, result) => {
      if (err) return res.json({ error: err.detail });
      res.status(200).json({ msg: "user created successfully" });
      console.log(result.rowCount == 1 ? "user created" : "denied");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error in adduser");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await pool.query(`select * from users where email = $1`, [
      email,
    ]);
    if (!userExist.rows[0]) return res.status(404).json("User not found");
    if (userExist.rows[0].password == password)
      return res.status(200).json(userExist.rows[0]);
    res.status(400).json("Email or password is incorrect");
  } catch (error) {
    console.log(error);
    res.status(400).json("ERROR in userinfo");
  }
};

const updPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { newpassword } = req.body;
    const userExist = await pool.query(`select * from users where id = $1`, [
      id,
    ]);
    console.log(userExist.rows[0]);
    if (!userExist.rows[0]) return res.status(404).json("user not found");
    const updatedUser = await pool.query(
      `update users set password = $1 where id = $2`,
      [newpassword, id],
      (err, result) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error while updating password");
  }
};

const deluser = async (req, res) => {
  try {
    const user = await pool.query(
      `delete from users where email = $1`,
      [req.params.email],
      (err, result) => {
        if (err)
          return res
            .status(400)
            .json("Something went wrong while removing user");
        else return res.status(200).json("User removed successfully");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error while removing user");
  }
};

const allusersProducts = async (req, res) => {
  try {
    const products = await pool.query(
      `select u.name, p.name as product from users u inner join products p on u.id = p.owner`
    );
    if (!products) return res.status(404).json("Products not found");
    res.status(200).json(products.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  allusers,
  adduser,
  login,
  updPassword,
  deluser,
  allusersProducts,
};
