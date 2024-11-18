const express = require("express");
const router = express.Router();
const productServices = require("../services/productServices");

router.route("/newProduct").post(productServices.addProduct);
router.route("/all").get(productServices.allProducts);

module.exports = router;
