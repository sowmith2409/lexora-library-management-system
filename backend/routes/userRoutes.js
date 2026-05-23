const express = require("express");

const router = express.Router();

const db = require("../database/db");

// GET USERS

router.get("/", (request, response) => {
  db.all(
    `
      SELECT *
      FROM users
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
});

// DELETE USER

router.delete("/:id", (request, response) => {
  const userId = request.params.id;

  db.run(
    `
      DELETE FROM users
      WHERE id = ?
      `,
    [userId],

    function (error) {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json({
        message: "User deleted successfully",
      });
    },
  );
});

module.exports = router;
