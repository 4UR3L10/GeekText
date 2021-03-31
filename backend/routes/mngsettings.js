// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get ManageSettings");
});

// [FullName] Update User Information.
router.put("/fullname", (req, res) => {
  const UserFullName = req.body.UserFullName;
  const IdEmail = req.body.IdEmail;

  if (UserFullName) {
    try {
      db.promise().query(
        `UPDATE user SET UserFullName = '${UserFullName}' WHERE EmailAddress = '${IdEmail}'`
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
        `UPDATE user SET EmailAddress = '${EmailAddress}' WHERE EmailAddress = '${IdEmail}'`
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
        `UPDATE user SET NickName = '${NickName}' WHERE EmailAddress = '${IdEmail}'`
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
  const IdEmail = req.body.IdEmail;

  //if (AnonymusStat) {
  try {
    db.promise().query(
      `UPDATE user SET AnonymusStat = '${AnonymusStat}'  WHERE EmailAddress = '${IdEmail}'` // CHANGE TO DYNAMIC USERRRRRR
    );

    console.log("User AnonymusStat Updated");
    res.status(201).send({ msg: "User Updated" });
  } catch (err) {
    console.log(err);
  }
  // }
});

// [Password] Insert User Information..
router.put("/password", (req, res) => {
  const Password = req.body.Password;
  const IdEmail = req.body.IdEmail;

  if (Password) {
    try {
      db.promise().query(
        `UPDATE user SET Password = '${Password}' WHERE EmailAddress = '${IdEmail}'` // CHANGE TO DYNAMIC USERRRRRR
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
  const Address2 = req.body.Address2;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;
  const IdEmail = req.body.IdEmail;

  if (Address && City && State && ZipCode && Country) {
    try {
      db.query(
        `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].UserID);

            db.promise().query(
              `UPDATE home_address SET Address = '${Address}',Address2 = '${Address2}',City = '${City}',State = '${State}',ZipCode = '${ZipCode}',Country = '${Country}', HmAddrssVld = 'N' WHERE UserID = '${results[0].UserID}'`
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
