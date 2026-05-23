const express = require("express");

const router = express.Router();


// CONTROLLERS

const {

  borrowBook,

  returnBook,

  getBorrowRecords,

  approveBorrow,

  rejectBorrow,

} = require(
  "../controllers/borrowController"
);


// MIDDLEWARE

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );


// BORROW BOOK

router.post(
  "/",
  authMiddleware,
  borrowBook
);


// GET BORROW RECORDS

router.get(
  "/",
  authMiddleware,
  getBorrowRecords
);


// APPROVE REQUEST

router.put(
  "/:id/approve",
  authMiddleware,
  approveBorrow
);


// REJECT REQUEST

router.put(
  "/:id/reject",
  authMiddleware,
  rejectBorrow
);


// RETURN BOOK

router.put(
  "/:id/return",
  authMiddleware,
  returnBook
);


module.exports = router;