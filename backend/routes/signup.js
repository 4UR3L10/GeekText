// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get Signup");
});

// [SignUp] Insert User.
router.post("/", (req, res) => {
  const { UserFullName, Password, EmailAddress, NickName } = req.body;

  if (UserFullName && Password && EmailAddress && NickName) {
    try {
      db.promise().query(
        `INSERT INTO user VALUES('${0}','${UserFullName}','${Password}','${EmailAddress}','N','${NickName}','N')`
      );
      res.status(201).send({ msg: "Created User" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
