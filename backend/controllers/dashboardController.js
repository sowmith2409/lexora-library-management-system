const db = require("../database/db");


// DASHBOARD STATS

const getDashboardStats = (
  req,
  res
) => {

  // TOTAL BOOKS

  db.get(

    `
    SELECT COUNT(*) AS totalBooks
    FROM books
    `,

    [],

    (err, booksResult) => {

      if (err) {

        return res.status(500).json({

          message:
            err.message,

        });

      }


      // TOTAL USERS

      db.get(

        `
        SELECT COUNT(*) AS totalUsers
        FROM users
        `,

        [],

        (err, usersResult) => {

          if (err) {

            return res.status(500).json({

              message:
                err.message,

            });

          }


          // ACTIVE BORROWS

          db.get(

            `
            SELECT COUNT(*) AS activeBorrows

            FROM borrow_records

            WHERE
              status = 'Approved'
            `,

            [],

            (err, activeResult) => {

              if (err) {

                return res.status(500).json({

                  message:
                    err.message,

                });

              }


              // RETURNED BOOKS

              db.get(

                `
                SELECT COUNT(*) AS returnedBooks

                FROM borrow_records

                WHERE
                  status = 'Returned'
                `,

                [],

                (err, returnedResult) => {

                  if (err) {

                    return res.status(500).json({

                      message:
                        err.message,

                    });

                  }


                  // OVERDUE BOOKS

                  db.get(

                    `
                    SELECT COUNT(*) AS overdueBooks

                    FROM borrow_records

                    WHERE
                      status = 'Overdue'
                    `,

                    [],

                    (err, overdueResult) => {

                      if (err) {

                        return res.status(500).json({

                          message:
                            err.message,

                        });

                      }


                      // AVAILABLE INVENTORY

                      db.get(

                        `
                        SELECT
                          SUM(available_stock)
                          AS availableInventory

                        FROM books
                        `,

                        [],

                        (err, inventoryResult) => {

                          if (err) {

                            return res.status(500).json({

                              message:
                                err.message,

                            });

                          }


                          // TOTAL FINES

                          db.get(

                            `
                            SELECT
                              SUM(amount)
                              AS totalFine

                            FROM fine_records
                            `,

                            [],

                            (err, fineResult) => {

                              if (err) {

                                return res.status(500).json({

                                  message:
                                    err.message,

                                });

                              }


                              // UNPAID FINES

                              db.get(

                                `
                                SELECT COUNT(*)
                                AS unpaidFines

                                FROM fine_records

                                WHERE paid_status = 0
                                `,

                                [],

                                (err, unpaidResult) => {

                                  if (err) {

                                    return res.status(500).json({

                                      message:
                                        err.message,

                                    });

                                  }


                                  // FINAL RESPONSE

                                  res.json({

                                    totalBooks:
                                      booksResult.totalBooks,

                                    totalUsers:
                                      usersResult.totalUsers,

                                    activeBorrows:
                                      activeResult.activeBorrows,

                                    returnedBooks:
                                      returnedResult.returnedBooks,

                                    overdueBooks:
                                      overdueResult.overdueBooks,

                                    availableInventory:
                                      inventoryResult.availableInventory || 0,

                                    totalFine:
                                      fineResult.totalFine || 0,

                                    unpaidFines:
                                      unpaidResult.unpaidFines,

                                  });

                                }

                              );

                            }

                          );

                        }

                      );

                    }

                  );

                }

              );

            }

          );

        }

      );

    }

  );

};


module.exports = {

  getDashboardStats,

};