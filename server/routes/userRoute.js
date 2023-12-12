const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUser, updateUser, deleteUser } = require("../controllers/userController");

router.get("/get-user", protect, getUser);
router.patch("/update-user", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;