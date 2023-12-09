const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all of the required fields.");
    };

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    };

    // Check if the user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("This email is already in use.");
    };

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // Generate web token
    

});

module.exports = {
    registerUser,
};