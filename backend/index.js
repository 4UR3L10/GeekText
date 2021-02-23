// Imports.
const express = require("express");
const signUpRoute = require("./routes/signup");
const app = express();
const cors = require("cors");

// Json form send data , you need to use URL enoded request bodies.
app.use(express.json());
app.use(cors());
// HTML form send data , you need to use URL enoded request bodies.
app.use(express.urlencoded({ extended: false }));

// Call SignUp Section.
app.use("/signup", signUpRoute);

// Run the Server PORT 3001.
app.listen(3001, () => {
  console.log("Server is running on port: 3001");
});
