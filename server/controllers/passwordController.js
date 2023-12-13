const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");

const { generateToken, hashToken } = require("../utils");
const sendEmail = require("../utils/sendEmail");

// Forgot password 
const forgotPassword = asyncHandler(async (req, res) => {
    res.send("Forgot password");
})

module.exports = {
    forgotPassword,
};