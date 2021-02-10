const mysql = require("mysql");

// Creates the connection.
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "geektext",
});

let geekdb = {};

geekdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM user", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

geekdb.one = (UserID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM user WHERE UserID = ?",
      [UserID],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

// Insert
// Update
// Delete

module.exports = geekdb;
