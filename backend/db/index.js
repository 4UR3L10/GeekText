const mysql = require("mysql2");

// Creates the connection.
module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "geektext",
});
