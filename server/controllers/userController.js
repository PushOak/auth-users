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

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, phone, bio, photo, role, isVerified } = user;

        const email = req.body.email;

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
            photo: updatedUser.photo,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified,
        });

    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

// Delete a user (by admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    await user.deleteOne();
    res.status(200).json({
        message: "User deleted successfully.",
    });
});

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};