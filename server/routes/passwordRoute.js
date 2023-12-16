const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { forgotPassword, resetPassword } = require("../controllers/passwordController");

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:resetToken", resetPassword);

module.exports = router;