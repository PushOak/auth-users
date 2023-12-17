const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    loginStatus,
    sendLoginCode,
    loginWithCode
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login-status", loginStatus);
router.get("/logout", logoutUser);
router.post("/send-login-code/:email", sendLoginCode);
router.post("/login-with-code/:email", loginWithCode);

module.exports = router;