const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");

const { generateToken, hashToken } = require("../utils");
const sendEmail = require("../utils/sendEmail");

// Send automated emails
const sendAutomatedEmail = asyncHandler(async (req, res) => {
    const {
        subject,
        send_to,
        reply_to,
        template,
        url,
    } = req.body;

    if (!subject ||
        !send_to ||
        !reply_to ||
        !template
    ) {
        res.status(500);
        throw new Error("Missing email parameter!");
    }

    // Get user
    const user = await User.findOne({ email: send_to });

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    const sent_from = process.env.EMAIL_USER;
    const name = user.name;
    const link = `${process.env.CLIENT_URL}${url}`;

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
        res.status(200).json({ message: "Email sent!" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again.");
    }
});

// Send verification email
const sendVerificationEmail = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error("User is already verified!");
    }

    // delete token if it exists in the DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }

    // create a verification token and save it to db
    const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(verificationToken);

    // hash token and save
    const hashedToken = hashToken(verificationToken);
    await new Token({
        userId: user._id,
        verificationToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000), // 60 minutes
    }).save();

    // construct verification URL
    const verificationURL = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    // Send Email
    const subject = "Verify your account - Auth-Users";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@dima.com";
    const template = "verifyEmail";
    const name = user.name;
    const link = verificationURL;

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
        res.status(200).json({ message: "Verification Email sent!" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again.");
    }
});

module.exports = {
    sendAutomatedEmail,
    sendVerificationEmail,
};