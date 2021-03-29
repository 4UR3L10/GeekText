const mysql = require("mysql2");

// Creates the connection.
module.exports = mysql.createConnection({host: "localhost", user: "user", password: "123456", database: "geektext"});
