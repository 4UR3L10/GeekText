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

geekdb.allUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM user", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

geekdb.oneUser = (UserID) => {
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

geekdb.oneEmail = (NickName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM user WHERE NickName = ?",
      [NickName],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};
// Select -> GET
// Insert -> PUT
// Update -> POST
// Delete -> DELETE

module.exports = geekdb;
