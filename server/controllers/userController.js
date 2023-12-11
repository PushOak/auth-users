const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const { generateToken } = require("../utils");

// Get a user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, phone, bio, photo, role, isVerified } = user;

        res.status(200).json({
            _id,
            name,
            phone,
            bio,
            photo,
            role,
            isVerified,
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

module.exports = {
    getUser,
};