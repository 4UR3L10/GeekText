// Imports.
const express = require("express");
const signUpRoute = require("./routes/signup");
const app = express();

// Json form send data , you need to use URL enoded request bodies.
app.use(express.json());
// HTML form send data , you need to use URL enoded request bodies.
app.use(express.urlencoded({ extended: false }));
//app.use(cors());

// Call SignUp Section.
app.use("/signup", signUpRoute);

// Run the Server PORT 3001.
app.listen(3001, () => {
  console.log("Server is running on port: 3001");
});
