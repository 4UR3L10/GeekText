// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

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
  const BillFirstName = req.body.BillFirstName;
  const BillLastName = req.body.BillLastName;
  const BillAddress = req.body.BillAddress;
  const BillAddress2 = req.body.BillAddress2;
  const BillCity = req.body.BillCity;
  const BillState = req.body.BillState;
  const BillZipCode = req.body.BillZipCode;
  const BillCountry = req.body.BillCountry;
  const IdEmail = req.body.IdEmail;

  console.log("CardType: " + CardType);
  console.log("CardNumber: " + CardNumber);
  console.log("CrdtHldrName: " + CrdtHldrName);
  console.log("ExpMonth: " + ExpMonth);
  console.log("ExpYear: " + ExpYear);
  console.log("BillFirstName: " + BillFirstName);
  console.log("BillLastName: " + BillLastName);
  console.log("BillAddress: " + BillAddress);
  console.log("BillAddress2: " + BillAddress2);
  console.log("BillCity: " + BillCity);
  console.log("BillState: " + BillState);
  console.log("BillZipCode: " + BillZipCode);
  console.log("BillCountry: " + BillCountry);

  console.log("Before IF");
  if (
    CardType &&
    CardNumber &&
    CrdtHldrName &&
    ExpMonth &&
    ExpYear &&
    BillFirstName &&
    BillLastName &&
    BillAddress &&
    BillCity &&
    BillState &&
    BillZipCode &&
    BillCountry
  ) {
    console.log("First Try");
    try {
      db.query(
        `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].UserID);

            db.promise().query(
              `INSERT INTO credit_card VALUES('${CardNumber}','${results[0].UserID}','${CardType}','${CrdtHldrName}','${ExpMonth}','${ExpYear}','N','N')`
            );
            console.log("User Credit Card Inserted");
            res.status(201).send({ msg: "Credit Card Inserted" });

            console.log("Second Try");

            try {
              db.promise().query(
                `INSERT INTO billing_address VALUES('${0}','${CardNumber}','${BillFirstName}','${BillLastName}','${BillAddress}','${BillAddress2}','${BillCity}','${BillState}','${BillZipCode}','${BillCountry}','+17861234567')` // CHANGE TO DYNAMIC USERRRRRR
              );
              console.log("User Billing Address Inserted");
              res.status(201).send({ msg: "Billing Address Inserted" });
            } catch (err) {
              console.log(err);
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }

    console.log("Last");
  }
});

// [Payment] Get Information.
router.post("/getpayment", (req, res) => {
  const IdEmail = req.body.IdEmail;

  try {
    db.query(
      `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
      (error, results) => {
        if (results == "") {
          console.log("No results");
        } else {
          db.query(
            `SELECT * FROM credit_card WHERE UserID = '${results[0].UserID}'`,
            (error, results) => {
              if (results == "") {
                console.log("No results");
              } else {
                res.status(200).send({ results });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// [Payment] Delete Information.
router.post("/deletepayment", (req, res) => {
  const CardNumber = req.body.CardNumber;
  try {
    db.query(
      `SELECT PurchaseID FROM purchase WHERE  CardNumber = '${CardNumber}'`,
      (error, results) => {
        if (results == "") {
          console.log("No results");
        } else {
          db.query(
            `DELETE FROM purchase_details WHERE PurchaseID = '${results[0].PurchaseID}'`
          );
          db.query(`DELETE FROM purchase WHERE CardNumber = '${CardNumber}'`);
          db.query(
            `DELETE FROM credit_card WHERE CardNumber = '${CardNumber}'`
          );
        }
      }
    );
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
  const BillFirstName = req.body.BillFirstName;
  const BillLastName = req.body.BillLastName;
  const BillAddress = req.body.BillAddress;
  const BillAddress2 = req.body.BillAddress2;
  const BillCity = req.body.BillCity;
  const BillState = req.body.BillState;
  const BillZipCode = req.body.BillZipCode;
  const BillCountry = req.body.BillCountry;
  const IdEmail = req.body.IdEmail;

  if (CardNumber) {
    try {
      db.query(
        `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].UserID);

            db.promise().query(
              `INSERT INTO credit_card VALUES('${CardNumber}','${results[0].UserID}','${CardType}','${CrdtHldrName}','${ExpMonth}','${ExpYear}','N','N')`
            );
            console.log("User Credit Card Inserted");
            res.status(201).send({ msg: "Credit Card Inserted" });

            console.log("Second Try");

            try {
              db.promise().query(
                `INSERT INTO billing_address VALUES('${0}','${CardNumber}','${BillFirstName}','${BillLastName}','${BillAddress}','${BillAddress2}','${BillCity}','${BillState}','${BillZipCode}','${BillCountry}','+17861234567')` // CHANGE TO DYNAMIC USERRRRRR
              );
              console.log("User Billing Address Inserted");
              res.status(201).send({ msg: "Billing Address Inserted" });
            } catch (err) {
              console.log(err);
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }

    console.log("Last");
  }
});

module.exports = router;
/*db.query(`DELETE FROM billing_address WHERE CardNumber = '${CardNumber}'`);*/
