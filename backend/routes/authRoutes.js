const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// REGISTER API

router.post("/register", registerUser);

// LOGIN API

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;
