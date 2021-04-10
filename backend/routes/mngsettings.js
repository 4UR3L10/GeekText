// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();
const express = require("express");

// middleware
router.use(express.json());
router.use(express.urlencoded());

// Default.
router.get("/", (req, res) => {
  console.log("Default Get ManageSettings");
});

// [FullName] Update User Information.
router.put("/fullname", (req, res) => {
  const UserFirstName = req.body.UserFirstName;
  const UserLastName = req.body.UserLastName;
  const IdEmail = req.body.IdEmail;

  if (UserFirstName && UserLastName) {
    try {
      db.promise().query(
        `UPDATE user SET user_firstname = '${UserFirstName}', user_lastname = '${UserLastName}'  WHERE email = '${IdEmail}'`
      );

      console.log("User Fullname Updated");
      res.status(201).send({ msg: "User Updated" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [Email] Update User Information.
router.put("/email", (req, res) => {
  const EmailAddress = req.body.EmailAddress;
  const IdEmail = req.body.IdEmail;

  if (EmailAddress) {
    try {
      db.promise().query(
        `UPDATE user SET email = '${EmailAddress}' WHERE email = '${IdEmail}'`
      );

      console.log("User EmailAddress Updated");
      res.status(201).send({ msg: "User Updated" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [NickName] Update User Information.
router.put("/nickname", (req, res) => {
  const NickName = req.body.NickName;
  const IdEmail = req.body.IdEmail;

  if (NickName) {
    try {
      db.promise().query(
        `UPDATE user SET nickname = '${NickName}' WHERE email = '${IdEmail}'`
      );

      console.log("User NickName Updated");
      res.status(201).send({ msg: "User Updated" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [Anonymus Status] Update User Information.
router.put("/status", (req, res) => {
  const AnonymusStat = req.body.AnonymusStat;
  const UserID = req.body.UserID;

  try {
    db.promise().query(
      `UPDATE user_book_review SET is_anonymous = '${AnonymusStat}'  WHERE user_id = '${UserID}'` // CHANGE TO DYNAMIC USERRRRRR
    );

    console.log("User AnonymusStat Updated");
    res.status(201).send({ msg: "User Updated" });
  } catch (err) {
    console.log(err);
  }
});

// [Password] Insert User Information..
router.put("/password", (req, res) => {
  const Password = req.body.Password;
  const IdEmail = req.body.IdEmail;

  if (Password) {
    try {
      db.promise().query(
        `UPDATE user SET Password = '${Password}' WHERE email = '${IdEmail}'` // CHANGE TO DYNAMIC USERRRRRR
      );
      console.log("User Password Updated");
      res.status(201).send({ msg: "Created User" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [Address] Insert User Information..
router.put("/address", (req, res) => {
  const Address = req.body.Address;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;
  const UserID = req.body.UserID;

  if (Address && City && State && ZipCode && Country) {
    try {
      db.query(
        `SELECT address_id FROM user_home_address WHERE user_id = '${UserID}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].address_id);

            db.promise().query(
              `UPDATE address SET street = '${Address}', city = '${City}',state = '${State}',zip_code = '${ZipCode}',country = '${Country}' WHERE id = '${results[0].address_id}'`
            );

            console.log("User home_address Updated");
            res.status(201).send({ msg: "Updated User home_address" });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
