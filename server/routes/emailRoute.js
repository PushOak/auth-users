const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { sendAutomatedEmail, sendVerificationEmail,  } = require("../controllers/emailController");

router.post("/send-automated-email", protect, sendAutomatedEmail);
router.post("/send-verification-email", protect, sendVerificationEmail);

module.exports = router;