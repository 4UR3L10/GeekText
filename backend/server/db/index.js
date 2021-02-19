const mysql = require("mysql");

// Creates the connection.
const pool = mysql.createPool({
  //connectionLimit: 10,
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

geekdb.signin = () => {
  const username = "ASDFG";
  const password = "ASASA";
  return new Promise((resolve, reject) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(
      "INSERT INTO publisher (PublisherName, PublisherInfo) VALUES (?, ?);",
      [username, password],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = geekdb;
