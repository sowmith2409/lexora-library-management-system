const db = require("../database/db");

// REQUEST BOOK

const borrowBook = (request, response) => {
  const {
    user_id,

    book_id,
  } = request.body;

  // CHECK BOOK

  db.get(
    `
    SELECT *
    FROM books
    WHERE id = ?
    `,

    [book_id],

    (error, book) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      // NOT FOUND

      if (!book) {
        return response.status(404).json({
          message: "Book not found",
        });
      }

      // OUT OF STOCK

      if (book.available_stock <= 0) {
        return response.status(400).json({
          message: "Book out of stock",
        });
      }

      // DATES

      const borrowDate = new Date();

      const dueDate = new Date();

      dueDate.setDate(dueDate.getDate() + 7);

      // INSERT REQUEST

      db.run(
        `
        INSERT INTO borrow_records
        (
          user_id,
          book_id,
          borrow_date,
          due_date,
          status
        )
        VALUES (?, ?, ?, ?, ?)
        `,

        [
          user_id,

          book_id,

          borrowDate.toISOString(),

          dueDate.toISOString(),

          "Pending",
        ],

        function (error) {
          if (error) {
            return response.status(500).json({
              message: error.message,
            });
          }

          response.status(201).json({
            message: "Borrow request submitted",
          });
        },
      );
    },
  );
};

// APPROVE REQUEST

const approveBorrow = (request, response) => {
  const borrowId = request.params.id;

  // FIND REQUEST

  db.get(
    `
    SELECT *
    FROM borrow_records
    WHERE id = ?
    `,

    [borrowId],

    (error, borrowRecord) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      // NOT FOUND

      if (!borrowRecord) {
        return response.status(404).json({
          message: "Request not found",
        });
      }

      // UPDATE STATUS

      db.run(
        `
        UPDATE borrow_records
        SET status = ?
        WHERE id = ?
        `,

        ["Approved", borrowId],

        function (error) {
          if (error) {
            return response.status(500).json({
              message: error.message,
            });
          }

          // REDUCE STOCK

          db.run(
            `
            UPDATE books
            SET available_stock =
              available_stock - 1
            WHERE id = ?
            `,

            [borrowRecord.book_id],
          );

          response.json({
            message: "Request approved",
          });
        },
      );
    },
  );
};

// REJECT REQUEST

const rejectBorrow = (request, response) => {
  const borrowId = request.params.id;

  db.run(
    `
    UPDATE borrow_records
    SET status = ?
    WHERE id = ?
    `,

    ["Rejected", borrowId],

    function (error) {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json({
        message: "Request rejected",
      });
    },
  );
};

// RETURN BOOK

const returnBook = (
  request,
  response
) => {

  // GET RECORD ID

  const borrowId =
    request.params.id;


  // FIND BORROW RECORD

  db.get(

    `
    SELECT *
    FROM borrow_records
    WHERE id = ?
    `,

    [borrowId],

    (error, borrowRecord) => {

      if (error) {

        return response.status(500).json({

          message:
            error.message,

        });

      }


      // RECORD NOT FOUND

      if (!borrowRecord) {

        return response.status(404).json({

          message:
            "Borrow record not found",

        });

      }


      // ALREADY RETURNED

      if (
        borrowRecord.status ===
        "Returned"
      ) {

        return response.status(400).json({

          message:
            "Book already returned",

        });

      }


      // RETURN DATE

      const returnDate =
        new Date();


      // UPDATE BORROW STATUS

      db.run(

        `
        UPDATE borrow_records

        SET
          return_date = ?,
          status = ?

        WHERE id = ?
        `,

        [

          returnDate.toISOString(),

          "Returned",

          borrowId,

        ],

        function (error) {

          if (error) {

            return response.status(500).json({

              message:
                error.message,

            });

          }


          // UPDATE STOCK ✅🔥

          db.run(

            `
            UPDATE books

            SET available_stock =
              available_stock + 1

            WHERE id = ?
            `,

            [borrowRecord.book_id],

            function (stockError) {

              if (stockError) {

                return response.status(500).json({

                  message:
                    stockError.message,

                });

              }


              // SUCCESS

              response.json({

                message:
                  "Book returned successfully",

              });

            }

          );

        }

      );

    }

  );

};

// GET RECORDS

const getBorrowRecords = (request, response) => {
  generateOverdueFines();
  db.all(
    `
    SELECT

      borrow_records.*,

      users.name
      AS user_name,

      books.title
      AS book_title

    FROM borrow_records

    LEFT JOIN users
    ON borrow_records.user_id =
    users.id

    LEFT JOIN books
    ON borrow_records.book_id =
    books.id

    ORDER BY borrow_records.id DESC
    `,

    [],

    (error, records) => {
      if (error) {
        return response.status(500).json({
          message: error.message,
        });
      }

      response.json(records);
    },
  );
};


const generateOverdueFines = () => {

  // TODAY

  const today =
    new Date();


  // FIND ACTIVE BORROWS

  db.all(

    `
    SELECT *
    FROM borrow_records
    WHERE
      status = 'Approved'
    `,

    [],

    (error, records) => {

      if (error) {

        console.log(error);

        return;

      }


      records.forEach((record) => {

        const dueDate =
          new Date(
            record.due_date
          );


        // OVERDUE

        if (today > dueDate) {

          // DAYS OVERDUE

          const daysOverdue =
            Math.floor(

              (
                today - dueDate
              )

              /

              (
                1000 * 60 * 60 * 24
              )

            );


          // FINE AMOUNT

          const fineAmount =
            daysOverdue * 10;


          // UPDATE STATUS

          db.run(

            `
            UPDATE borrow_records
            SET status = 'Overdue'
            WHERE id = ?
            `,

            [record.id]

          );


          // CHECK EXISTING FINE

          db.get(

            `
            SELECT *
            FROM fine_records
            WHERE borrow_record_id = ?
            `,

            [record.id],

            (error, existingFine) => {

              if (error) {

                console.log(error);

                return;

              }


              // CREATE NEW FINE

              if (!existingFine) {

                db.run(

                  `
                  INSERT INTO fine_records
                  (
                    borrow_record_id,
                    amount,
                    days_overdue,
                    paid_status
                  )
                  VALUES (?, ?, ?, ?)
                  `,

                  [

                    record.id,

                    fineAmount,

                    daysOverdue,

                    0,

                  ]

                );

              }


              // UPDATE EXISTING FINE

              else {

                db.run(

                  `
                  UPDATE fine_records
                  SET
                    amount = ?,
                    days_overdue = ?
                  WHERE borrow_record_id = ?
                  `,

                  [

                    fineAmount,

                    daysOverdue,

                    record.id,

                  ]

                );

              }

            }

          );

        }

      });

    }

  );

};

module.exports = {
  borrowBook,

  approveBorrow,

  rejectBorrow,

  returnBook,

  getBorrowRecords,
};
