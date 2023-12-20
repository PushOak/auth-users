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

// Get users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort("-createdAt").select("-password");

    if (!users) {
        res.status(500);
        throw new Error("Something went wrong!");
    }

    res.status(200).json(users);
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, email, phone, bio, photo, role, isVerified } = user;

        // const email = req.body.email;

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
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

// Upgrade a user
const upgradeUser = asyncHandler(async (req, res) => {
    const { role, id } = req.body;
    const user = await User.findById(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    user.role = role;
    await user.save();

    res.status(200).json({
        message: `User ${user.name}'s role updated to ${role}`,
    });
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
    getUsers,
    updateUser,
    upgradeUser,
    deleteUser,
};