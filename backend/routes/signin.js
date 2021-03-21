// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Default.
router.get("/", (req, res) => {
  console.log("Default Get SignIn");
});

// [SignIn] Retrieve & Compare User Information.
router.post("/user", (req, res) => {
  const EmailAddress = req.body.EmailAddress;
  const Password = req.body.Password;

  console.log("EmailAddress: " + EmailAddress);
  console.log("req.body.EmailAddress: " + req.body.EmailAddress);
  console.log("Password: " + Password);

  if (Password && EmailAddress) {
    console.log("After IF Backedn");
    try {
      db.promise().query(
        `SELECT EmailAddress, Password FROM user WHERE EmailAddress = '${EmailAddress}' AND Password = '${Password}'`
      );

      console.log("INFO RETRIEVED");
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
