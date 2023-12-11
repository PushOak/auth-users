const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");



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
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // this is 1 day
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, phone, bio, photo, role, isVerified } = user;

        res.status(201).json({
            _id,
            name,
            phone,
            bio,
            photo,
            role,
            isVerified,
            token,
        });
    } else {
        throw new Error("Invalid user data.");

    }


});

module.exports = {
    registerUser,
};