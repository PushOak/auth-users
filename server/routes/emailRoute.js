const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { sendAutomatedEmail, sendVerificationemail } = require("../controllers/emailController");

router.post("/send-automated-email", protect, sendAutomatedEmail);
router.post("/send-verification-email", protect, sendVerificationemail);

module.exports = router;