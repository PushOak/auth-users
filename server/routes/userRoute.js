const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getUser, updateUser, deleteUser } = require("../controllers/userController");

router.get("/get-user", protect, getUser);
router.patch("/update-user", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;