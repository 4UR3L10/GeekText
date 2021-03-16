// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get SignIn");
});

// [SignIn] Retrieve & Compare User Information.
router.get("/user", (req, res) => {
  const EmailAddress = req.body.EmailAddress;
  const Password = req.body.Password;
  console.log("EmailAddress: " + EmailAddress);
  console.log("Password: " + Password);

  if (Password && EmailAddress) {
    console.log("After IF Backedn");
    try {
      db.promise().query(
        `SELECT EmailAddress, Password FROM user WHERE EmailAddress = '${EmailAddress}' AND Password = '${Password}'`
      );
      //console.log("User Logged In");
      console.log("INFO RETRIEVED");
      res.status(201).send({ msg: "User Logged In" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
