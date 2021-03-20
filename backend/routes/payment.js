// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get ManageSettings");
});

// [Address] Insert User Information..
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
      db.promise().query(
        `INSERT INTO credit_card VALUES('${CardNumber}','1','${CardType}','${CrdtHldrName}','${ExpMonth}','${ExpYear}','N','N')` // CHANGE TO DYNAMIC USERRRRRR
      );
      console.log("User Credit Card Inserted");
      res.status(201).send({ msg: "Credit Card Inserted" });
    } catch (err) {
      console.log(err);
    }

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

    console.log("Last");
  }
});

module.exports = router;
