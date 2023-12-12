const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser, loginStatus } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login-status", loginStatus);
router.get("/logout", logoutUser);

module.exports = router;