const db = require("../database/db");

// GET ALL BOOKS

const getBooks = (request, response) => {
  db.all(
    `
      SELECT *
      FROM books
      ORDER BY id DESC
      `,
    [],

    (error, rows) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json(rows);
    },
  );
};

// ADD BOOK

const addBook = (request, response) => {
  // GET DATA

  const {
    title,

    author,

    total_stock,

    available_stock,
  } = request.body;

  // VALIDATION

  if (!title || !author || !total_stock) {
    return response.status(400).json({
      message: "All fields are required",
    });
  }

  // COUNT CURRENT BOOKS

  db.get(
    `
      SELECT COUNT(*) AS totalBooks
      FROM books
      `,
    [],

    (error, result) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      // GENERATE ISBN

      const nextBookNumber = result.totalBooks + 1;

      const generatedIsbn = `ISBN${String(nextBookNumber).padStart(3, "0")}`;

      // INSERT BOOK

      db.run(
        `
          INSERT INTO books
          (
            title,
            isbn,
            author,
            total_stock,
            available_stock
          )
          VALUES (?, ?, ?, ?, ?)
          `,
        [title, generatedIsbn, author, total_stock, available_stock],

        function (error) {
          if (error) {
            return response.status(500).json({
              message: error.message,
            });
          }

          response.status(201).json({
            message: "Book added successfully",

            isbn: generatedIsbn,
          });
        },
      );
    },
  );
};

// UPDATE BOOK

const updateBook = (request, response) => {
  // GET BOOK ID

  const bookId = request.params.id;

  // GET DATA

  const {
    title,

    author,

    total_stock,

    available_stock,
  } = request.body;

  // VALIDATION

  if (!title || !author || !total_stock) {
    return response.status(400).json({
      message: "All fields are required",
    });
  }

  // UPDATE QUERY

  db.run(
    `
      UPDATE books
      SET
        title = ?,
        author = ?,
        total_stock = ?,
        available_stock = ?
      WHERE id = ?
      `,
    [title, author, total_stock, available_stock, bookId],

    function (error) {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json({
        message: "Book updated successfully",
      });
    },
  );
};

// DELETE BOOK

const deleteBook = (request, response) => {
  const bookId = request.params.id;

  db.run(
    `
      DELETE FROM books
      WHERE id = ?
      `,
    [bookId],

    function (error) {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json({
        message: "Book deleted successfully",
      });
    },
  );
};

// GET SINGLE BOOK

const getSingleBook = (request, response) => {
  const bookId = request.params.id;

  db.get(
    `
      SELECT *
      FROM books
      WHERE id = ?
      `,
    [bookId],

    (error, book) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      if (!book) {
        return response.status(404).json({
          message: "Book not found",
        });
      }

      response.json(book);
    },
  );
};

module.exports = {
  getBooks,

  getSingleBook,

  addBook,

  updateBook,

  deleteBook,
};
