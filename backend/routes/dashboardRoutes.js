const express = require("express");

const router = express.Router();


// CONTROLLER

const {
  getDashboardStats,
} = require(
  "../controllers/dashboardController"
);


// MIDDLEWARE

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );


// DASHBOARD STATS

router.get(

  "/stats",

  authMiddleware,

  authorizeRoles(
    "admin",
    "librarian"
  ),

  getDashboardStats

);


module.exports = router;