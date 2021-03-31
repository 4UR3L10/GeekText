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

// [SignUp] Insert User Information..
router.post("/user", (req, res) => {
  const UserFullName = req.body.UserFullName;
  const EmailAddress = req.body.EmailAddress;
  const Password = req.body.Password;
  const NickName = req.body.NickName;

  if (Password && EmailAddress && UserFullName && NickName) {
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

// [SignUp] Testing Insert User with Email and Password.
router.post("/test", (req, res) => {
  //const { EmailAddress, Password } = req.body;
  const EmailAddress = req.body.EmailAddress;
  const Password = req.body.Password;

  if (Password && EmailAddress) {
    try {
      db.promise().query(
        `INSERT INTO user VALUES('${0}','Testing Test','${Password}','${EmailAddress}','N','Fulana','N')`
      );
      res.status(201).send({ msg: "Created User" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
