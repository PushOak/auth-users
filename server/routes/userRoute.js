const express = require("express");
const router = express.Router();

const { protect, adminOnly, authorOnly } = require("../middleware/authMiddleware");
const { getUser, updateUser, deleteUser, getUsers } = require("../controllers/userController");

router.get("/get-user", protect, getUser);
router.get("/get-users", protect, authorOnly, getUsers);
router.patch("/update-user", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;