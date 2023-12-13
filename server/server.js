const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Route imports
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const emailRoute = require("./routes/emailRoute");

// Utilities
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://auth-userz.vercel.app"],
    credentials: true,
}));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/emails", emailRoute);

app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        })
    })
    .catch((error) => console.log(error));