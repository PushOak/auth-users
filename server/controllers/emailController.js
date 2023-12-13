const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const { generateToken } = require("../utils");
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

module.exports = {
    sendAutomatedEmail,
}