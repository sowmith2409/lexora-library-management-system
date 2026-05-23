const express = require("express");

const router = express.Router();

// IMPORT CONTROLLER

const { getFines, payFine } = require("../controllers/fineController");

// IMPORT MIDDLEWARE

const authMiddleware = require("../middleware/authMiddleware");

// GET ALL FINES

router.get("/", authMiddleware, getFines);

// PAY FINE

router.put("/:id/pay", authMiddleware, payFine);

module.exports = router;
