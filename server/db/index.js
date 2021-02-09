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

/* Start Coding Below */
