const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { forgotPassword } = require("../controllers/passwordController");

router.post("/forgot-password", forgotPassword);


module.exports = router;