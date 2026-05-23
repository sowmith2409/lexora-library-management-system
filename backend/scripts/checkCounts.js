const db = require("../database/db");

function getCount(table) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as c FROM ${table}`, (err, row) => {
      if (err) return reject(err);
      resolve(row.c);
    });
  });
}

(async () => {
  try {
    const borrowCount = await getCount('borrow_records');
    const fineCount = await getCount('fine_records');
    const books = await new Promise((res, rej) => {
      db.all('SELECT id, title, total_stock, available_stock FROM books LIMIT 5', (err, rows) => {
        if (err) return rej(err);
        res(rows);
      });
    });

    console.log('borrow_records count:', borrowCount);
    console.log('fine_records count:', fineCount);
    console.log('sample books:', books);
  } catch (err) {
    console.error('Error checking counts:', err.message);
  } finally {
    db.close(() => process.exit(0));
  }
})();
