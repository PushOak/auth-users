const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { sendAutomatedEmail, sendVerificationEmail, verifyUser, } = require("../controllers/emailController");

router.post("/send-automated-email", protect, sendAutomatedEmail);
router.post("/send-verification-email", protect, sendVerificationEmail);
router.patch("/verify-user/:verificationToken", verifyUser);

module.exports = router;