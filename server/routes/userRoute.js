const express = require("express");
const router = express.Router();

const { getUser, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get-user", protect, getUser);
router.patch("/update-user", protect, updateUser);

module.exports = router;