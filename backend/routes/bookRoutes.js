const express = require("express");

const router = express.Router();

// IMPORT CONTROLLERS

const {
  getBooks,

  addBook,

  deleteBook,

  updateBook,

  getSingleBook,
} = require("../controllers/bookController");

// GET ALL BOOKS

router.get("/", getBooks);

// GET SINGLE BOOK

router.get("/:id", getSingleBook);

// ADD BOOK

router.post("/", addBook);

// DELETE BOOK

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);

module.exports = router;
