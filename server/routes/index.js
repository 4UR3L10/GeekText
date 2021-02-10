/* Imports. */
const express = require("express");
const db = require("../db");
const router = express.Router();

/* GET-/-AllUsers. */
router.get("/", async (req, res, next) => {
  try {
    let results = await db.allUsers();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* GET-/-User-/#. */
router.get("/:UserID", async (req, res, next) => {
  try {
    let results = await db.oneUser(req.params.UserID);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/* GET-/-EmailAdress-/#. */
router.get("/:NickName", async (req, res, next) => {
  try {
    let results = await db.oneEmail(req.params.NickName);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Select -> GET
// Insert -> PUT
// Update -> POST
// Delete -> DELETE

module.exports = router;
