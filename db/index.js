const mysql = require("mysql2");

// Creates the connection.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "geektext",
});
