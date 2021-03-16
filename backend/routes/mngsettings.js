// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get ManageSettings");
});

// [SignIn] Retrieve & Compare User Information.
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

module.exports = router;
