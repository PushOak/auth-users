const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const { generateToken } = require("../utils");

// Register new user
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

    // Get user agent
    const ua = parser(req.headers["user-agent"]);
    const userAgent = [ua.ua];

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
        userAgent,
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

// Login existing user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
        res.send(400);
        throw new Error("Please add email and password.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.send(404);
        throw new Error("User not found! Please sign up.");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        res.send(400);
        throw new Error("Invalid email or password.");
    }

    // Trigger 2 factor authentication for unknown userAgent

    const token = generateToken(user._id);

    if (user && passwordIsCorrect) {
        // Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // this is 1 day
            sameSite: "none",
            secure: true,
        });

        const { _id, name, phone, bio, photo, role, isVerified } = user;

        res.status(200).json({
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
        res.send(500);
        throw new Error("Something went wrong! Please try again.");
    }
});

module.exports = {
    registerUser,
    loginUser,
};