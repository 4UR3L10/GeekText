const mysql = require("mysql2");
const credentials = require("../routes/credentials");

// Creates the connection.
module.exports = mysql.createConnection({host: "localhost", user: credentials.user, password: "123456", database: "geektext"});
