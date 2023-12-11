const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const { generateToken } = require("../utils");

// Get a user
const getUser = asyncHandler(async (req, res) => {
    res.send("Get a single user");
});

module.exports = {
    getUser,
};