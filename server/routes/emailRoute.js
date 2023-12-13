const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { sendAutomatedEmail } = require("../controllers/emailController");

router.post("/send-automated-email", protect, sendAutomatedEmail);

module.exports = router;