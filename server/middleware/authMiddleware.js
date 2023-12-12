const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("User not authorized, please login.");
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from token
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            res.status(404);
            throw new Error("User not not found.");
        }

        if (user.role === "suspended") {
            res.status(400);
            throw new Error("This user has been suspended. Please contact support.");
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401);
        throw new Error("User not authorized, please login.");
    }
});

const adminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(401);
        throw new Error("User not authorized as an admin.");
    }
};

const authorOnly = async (req, res, next) => {
    if (req.user.role === "author" || req.user.role === "admin") {
        next();
    } else {
        res.status(401);
        throw new Error("User not authorized as an author.");
    }
};

const verifiedOnly = async (req, res, next) => {
    if (req.user && req.user.isVerified) {
        next();
    } else {
        res.status(401);
        throw new Error("User not authorized, the account is not verified.");
    }
};

module.exports = {
    protect,
    verifiedOnly,
    authorOnly,
    adminOnly,
};