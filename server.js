// Imports.
const express = require("express");
const signUpRoute = require("./routes/signup");
const app = express();
const cors = require("cors");

// Json form send data , you need to use URL enoded request bodies.
app.use(express.json());
// HTML form send data , you need to use URL enoded request bodies.
app.use(express.urlencoded({ extended: false }));
//app.use(cors());

// Call SignUp Section.
app.use("/signup", signUpRoute);

// Run the Server.
app.listen(3001, () => {
  console.log("Server is running on port: 3001}");
});
