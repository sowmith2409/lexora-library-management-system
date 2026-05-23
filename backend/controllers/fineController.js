const db = require("../database/db");


// GET ALL FINES

const getFines = (req, res) => {

  db.all(

    `
    SELECT

      fine_records.id,

      fine_records.borrow_record_id,

      fine_records.amount,

      fine_records.days_overdue,

      fine_records.paid_status,

      users.id
      AS user_id,

      users.name
      AS user_name,

      books.id
      AS book_id,

      books.title
      AS book_title

    FROM fine_records

    LEFT JOIN borrow_records
    ON fine_records.borrow_record_id =
    borrow_records.id

    LEFT JOIN users
    ON borrow_records.user_id =
    users.id

    LEFT JOIN books
    ON borrow_records.book_id =
    books.id

    ORDER BY fine_records.id DESC
    `,

    [],

    (err, fines) => {

      if (err) {

        return res.status(500).json({

          message:
            err.message,

        });

      }


      // SUCCESS

      res.json(fines);

    }

  );

};


// PAY FINE

const payFine = (req, res) => {

  const { id } =
    req.params;


  db.run(

    `
    UPDATE fine_records

    SET paid_status = 1

    WHERE id = ?
    `,

    [id],

    function (err) {

      if (err) {

        return res.status(500).json({

          message:
            err.message,

        });

      }


      // NOT FOUND

      if (this.changes === 0) {

        return res.status(404).json({

          message:
            "Fine not found",

        });

      }


      // SUCCESS

      res.json({

        message:
          "Fine paid successfully",

      });

    }

  );

};


module.exports = {

  getFines,

  payFine,

};