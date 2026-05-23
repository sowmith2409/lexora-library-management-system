const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const fineRoutes = require("./routes/fineRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

// IMPORTANT

app.use(express.json());

// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/fines", fineRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
