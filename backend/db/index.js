const mysql = require("mysql");
// My SQL2 Package was also installed.

// Creates the connection.
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "geektext",
});
