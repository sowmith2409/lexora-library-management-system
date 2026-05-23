const db = require("../database/db");

const sql = `
DELETE FROM borrow_records;

DELETE FROM fine_records;

DELETE FROM sqlite_sequence WHERE name='borrow_records';

DELETE FROM sqlite_sequence WHERE name='fine_records';

UPDATE books
SET available_stock = total_stock;
`;

db.exec(sql, (err) => {
  if (err) {
    console.error("Error executing SQL cleanup:", err.message);
    process.exit(1);
  }

  console.log("Database cleanup completed successfully.");

  db.close((closeErr) => {
    if (closeErr) console.error("Error closing DB:", closeErr.message);
    process.exit(0);
  });
});
