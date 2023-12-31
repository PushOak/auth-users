const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils");

const Cryptr = require("cryptr");
const Token = require("../models/tokenModel");
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

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
    // const ua = parser(req.headers["user-agent"]);
    // const thisUserAgent = [ua.ua];
    // console.log(thisUserAgent);
    // const allowedAgent = user.userAgent.includes(thisUserAgent);

    // if (!allowedAgent) {
    //     // generate 6-digit code
    //     const loginCode = Math.floor(100000 + Math.random() * 900000);
    //     console.log(loginCode);

    //     // encrypt login code before saving to DB
    //     const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    //     // delete token if it exists in the DB
    //     let userToken = await Token.findOne({ userId: user._id });
    //     if (userToken) {
    //         await userToken.deleteOne();
    //     }

    //     // save token to DB
    //     await new Token({
    //         userId: user._id,
    //         loginToken: encryptedLoginCode,
    //         createdAt: Date.now(),
    //         expiresAt: Date.now() + 60 * (60 * 1000), // 60 min
    //     }).save();

    //     res.status(400);
    //     throw new Error("New browser or device detected.");
    // }

    // generate token
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

// Send login code via email
const sendLoginCode = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
        res.send(404);
        throw new Error("User not found!");
    }

    // find login code in the DB
    const userToken = await Token.findOne({
        userId: user._id,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or expired token. Please login again.");
    }

    const loginCode = userToken.loginToken;
    const decryptedLoginCode = cryptr.decrypt(loginCode);

    // send login code email
    const subject = "Login Access Code - Auth-Users";
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@dima.com";
    const template = "loginCode";
    const name = user.name;
    const link = decryptedLoginCode;

    try {
        await sendEmail(
            subject,
            send_to,
            sent_from,
            reply_to,
            template,
            name,
            link,
        );
        res.status(200).json({ message: `Access code sent to ${email}` });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again.");
    }
});

// Login with code
const loginWithCode = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { loginCode } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    // find user Login Token
    const userToken = await Token.findOne({
        userId: user.id,
        expiresAt: { $gt: Date.now(), },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or expired token! Please login again.");
    }

    const decryptedLoginCode = cryptr.decrypt(userToken.loginToken);

    if (loginCode !== decryptedLoginCode) {
        res.status(400);
        throw new Error("Incorrect login code, please try again.");
    } else {
        // Register user agent
        const ua = parser(req.headers["user-agent"]);
        const thisUserAgent = ua.ua;
        user.userAgent.push(thisUserAgent);
        await user.save();

        // Generate Token
        const token = generateToken(user._id);

        // Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        });

        const {
            _id,
            name,
            email,
            phone,
            bio,
            photo,
            role,
            isVerified,
        } = user;

        res.status(200).json({
            _id,
            name,
            email,
            phone,
            bio,
            photo,
            role,
            isVerified,
            token,
        });
    }
});

// Login status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }

    // verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json(true);
    }
    return res.json(false);
});

// Logout existing user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now(0)), // Expire cookie immideately
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "User logged out successfully" });
});

module.exports = {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    sendLoginCode,
    loginWithCode,
};