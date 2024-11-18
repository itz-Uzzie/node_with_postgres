const express = require("express");
const router = express.Router();
const userServices = require("../services/userServices");

router.route("/adduser").post(userServices.adduser);
router.route("/").get(userServices.allusers);
router.route("/userinfo").get(userServices.login);
router.route("/updPassword/:id").patch(userServices.updPassword);
router.route("/remove/:email").delete(userServices.deluser);
router.route("/allUsersProducts").get(userServices.allusersProducts);

module.exports = router;
