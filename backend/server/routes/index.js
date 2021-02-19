const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:UserID", async (req, res, next) => {
  try {
    let results = await db.one(req.params.UserID);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Insert -> PUT
// Update -> POST
// Delete -> DELETE

router.post("/register", async (req, res, next) => {
  try {
    let results = await db.signin();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
