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

  if (Password && EmailAddress) {
    db.query(
      `SELECT EmailAddress, Password, UserID FROM user WHERE EmailAddress = '${EmailAddress}' AND Password = '${Password}'`,
      (error, results) => {
        console.log("testing the valueP: " + results);

        if (results == "") {
          console.log("No results");
          return res.status(404).send({ msg: "User Nto found" });
        } else {
          console.log("results: " + results[0].Password);
          return res.json(results);
        }
      }
    );

    console.log("finished posting");
  }
});

module.exports = router;
