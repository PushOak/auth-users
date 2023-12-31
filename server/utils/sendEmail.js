const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmail = async (
    subject,
    send_to,
    sent_from,
    reply_to,
    template,
    name,
    link,
) => {
    //Create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const handleBarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./views"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars",
    };

    transporter.use("compile", hbs(handleBarOptions));

    // Options for sending email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject,
        template,
        context: {
            name,
            link,
        }
    };

    // Send the email
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;