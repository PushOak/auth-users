const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const { generateToken, hashToken } = require("../utils");
const sendEmail = require("../utils/sendEmail");

// Forgot password 
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("No user found with this email!");
    }

    // delete token if it exists in the DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }

    // create verification token and save it
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    // hash the token and save it
    const hashedToken = hashToken(resetToken);
    await new Token({
        userId: user._id,
        resetToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000), // 60 min
    }).save();

    // construct a reset URL
    const resetURL = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

    // Send Email
    const subject = "Password Reset Request - Auth-Users";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@dima.com";
    const template = "forgotPassword";
    const name = user.name;
    const link = resetURL;

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
        res.status(200).json({ message: "Password Reset Email sent!" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again.");
    }

});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const hashedToken = hashToken(resetToken);

    const userToken = await Token.findOne({
        resetToken: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or expired Token.");
    }

    // find user
    const user = await User.findOne({ _id: userToken.userId });

    // now - reset user's password
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful! Please login." });
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please enter and new password.");
    }

    // Check if old password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // save the new password
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();

        res.status(200).json({ message: "Password changed successfully. Please re-login." });
    } else {
        res.status(400);
        throw new Error("Old password is incorrect.");
    }

});

module.exports = {
    forgotPassword,
    resetPassword,
    changePassword,
};