const express = require("express");
const { signup, login,refresh,logout } = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);



module.exports = router;
