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

  if (UserFullName) {
    try {
      db.promise().query(
        `UPDATE user SET UserFullName = '${UserFullName}' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
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

  if (EmailAddress) {
    try {
      db.promise().query(
        `UPDATE user SET EmailAddress = '${EmailAddress}' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
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

  if (NickName) {
    try {
      db.promise().query(
        `UPDATE user SET NickName = '${NickName}' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
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

  //if (AnonymusStat) {
  try {
    db.promise().query(
      `UPDATE user SET AnonymusStat = '${AnonymusStat}' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
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

  if (Password) {
    try {
      db.promise().query(
        `UPDATE user SET Password = '${Password}' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
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

  if (Address && City && State && ZipCode && Country) {
    try {
      db.promise().query(
        `UPDATE home_address SET Address = '${Address}',Address2 = '${Address2}',City = '${City}',State = '${State}',ZipCode = '${ZipCode}',Country = '${Country}', HmAddrssVld = 'N' WHERE UserID = '1'` // CHANGE TO DYNAMIC USERRRRRR
      );
      console.log("User home_address Updated");
      res.status(201).send({ msg: "Updated User home_address" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
