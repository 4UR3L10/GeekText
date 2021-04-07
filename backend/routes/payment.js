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

// [Payment] Insert User Information..
router.post("/newpayment", (req, res) => {
  const CardType = req.body.CardType;
  const CardNumber = req.body.CardNumber;
  const CrdtHldrName = req.body.CrdtHldrName;
  const ExpMonth = req.body.ExpMonth;
  const ExpYear = req.body.ExpYear;
  const SecurityCode = req.body.SecurityCode;
  const UserID = req.body.UserID;
  const formatDate = ExpYear[2] + ExpYear[3];
  const dateTemp = ExpMonth + "/" + formatDate;

  if (CardType && CardNumber && CrdtHldrName && dateTemp && SecurityCode) {
    console.log("First Try");
    try {
      db.promise().query(
        `INSERT INTO credit_card VALUES('${0}','${CardNumber}','${CardType}','${CrdtHldrName}','${dateTemp}','${SecurityCode}', '0')`
      );

      db.query(
        `SELECT id FROM credit_card WHERE card_number = '${CardNumber}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].id);

            db.promise().query(
              `INSERT INTO user_credit_card VALUES('${UserID}','${results[0].id}')`
            );
          }
        }
      );

      console.log("User Credit Card Inserted");
      /*res.status(201).send({ msg: "Credit Card Inserted" });*/
    } catch (err) {
      console.log(err);
    }

    console.log("Last");
  }
});

// [Payment] Get Information.
router.post("/getpayment", (req, res) => {
  const UserID = req.body.UserID;

  try {
    db.query(
      `SELECT * FROM credit_card WHERE id IN (SELECT credit_card_id FROM user_credit_card WHERE user_id = '${UserID}')`,
      (error, results) => {
        if (results == "") {
          console.log("No results");
        } else {
          res.status(200).send({ results });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// [Payment] Delete Information.
router.post("/deletepayment", (req, res) => {
  const CardID = req.body.CardID;
  try {
    db.query(`DELETE FROM credit_card WHERE id = '${CardID}'`);
    db.query(`DELETE FROM user_credit_card WHERE credit_card_id = '${CardID}'`);
  } catch (err) {
    console.log(err);
  }
});

// [Payment] Update User Information..
router.post("/updatepayment", (req, res) => {
  const CardType = req.body.CardType;
  const CardNumber = req.body.CardNumber;
  const CrdtHldrName = req.body.CrdtHldrName;
  const ExpMonth = req.body.ExpMonth;
  const ExpYear = req.body.ExpYear;
  const SecurityCode = req.body.SecurityCode;
  const CardID = req.body.CardID;
  const formatDate = ExpYear[2] + ExpYear[3];
  const dateTemp = ExpMonth + "/" + formatDate;

  console.log("Result CardID: " + CardID);

  if (CardNumber) {
    try {
      db.query(
        `UPDATE credit_card SET card_number = '${CardNumber}', card_type = '${CardType}', holder_name = '${CrdtHldrName}', expire_date = '${dateTemp}', security_code = '${SecurityCode}' WHERE id = '${CardID}'`
      );

      console.log("User Credit Card Info Updated");
    } catch (err) {
      console.log(err);
    }

    console.log("Last");
  }
});

module.exports = router;
