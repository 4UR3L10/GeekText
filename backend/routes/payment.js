// Imports.
const {Router} = require("express");
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
    const IdEmail = req.body.IdEmail;

    console.log("CardType: " + CardType);
    console.log("CardNumber: " + CardNumber);
    console.log("CrdtHldrName: " + CrdtHldrName);
    console.log("ExpMonth: " + ExpMonth);
    console.log("ExpYear: " + ExpYear);
    console.log("SecurityCode: " + SecurityCode);
    console.log("IdEmail: " + IdEmail);

    const formatDate = ExpYear[2] + ExpYear[3];
    const dateTemp = ExpMonth + "/" + formatDate;

    console.log("formatDate: " + formatDate);
    console.log("dateTemp: " + dateTemp);

    console.log("Before IF");
    if (CardType && CardNumber && CrdtHldrName && dateTemp && SecurityCode) {
        console.log("First Try");
        try {
            db.query(`SELECT id FROM user WHERE email = '${IdEmail}'`, (error, results) => {
                if (results == "") {
                    console.log("No results");
                } else {
                    console.log("results: " + results[0].UserID);
                    // MISIINGGGGGGGGGGG THE IS VALID THE CREDIT CARDDDDDDDDDDDDDDDDDDDD.
                    db.promise().query(`INSERT INTO credit_card VALUES('${
                        results[0].id
                    }','${CardNumber}','${CardType}','${CrdtHldrName}','${dateTemp}','${SecurityCode}')`);
                    console.log("User Credit Card Inserted");
                    /*res.status(201).send({ msg: "Credit Card Inserted" });*/
                }
            });
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
        db.query(`SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`, (error, results) => {
            if (results == "") {
                console.log("No results");
            } else {
                db.query(`SELECT * FROM credit_card WHERE UserID = '${
                    results[0].UserID
                }'`, (error, results) => {
                    if (results == "") {
                        console.log("No results");
                    } else {
                        res.status(200).send({results});
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// [Payment] Delete Information.
router.post("/deletepayment", (req, res) => {
    const CardNumber = req.body.CardNumber;
    try {
        db.query(`SELECT PurchaseID FROM purchase WHERE  CardNumber = '${CardNumber}'`, (error, results) => {
            if (results == "") {
                console.log("No results");
            } else {
                db.query(`DELETE FROM purchase_details WHERE PurchaseID = '${
                    results[0].PurchaseID
                }'`);
                db.query(`DELETE FROM purchase WHERE CardNumber = '${CardNumber}'`);
                db.query(`DELETE FROM credit_card WHERE CardNumber = '${CardNumber}'`);
            }
        });
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
    const CardNumberOld = req.body.CardNumberOld;

    console.log("Result CardNumberOld: " + CardNumberOld);

    if (CardNumber) {
        try {
            db.query(`UPDATE credit_card SET CardNumber = '${CardNumber}', CardType = '${CardType}', CrdtHldrName = '${CrdtHldrName}', ExpMonth = '${ExpMonth}', ExpYear = '${ExpYear}' WHERE CardNumber = '${CardNumberOld}'`);

            console.log("User Credit Card Info Updated");

            db.query(`UPDATE billing_address SET BillFirstName = '${BillFirstName}', BillLastName = '${BillLastName}', BillAddress = '${BillAddress}', BillAddress2 = '${BillAddress2}', BillCity = '${BillCity}', BillState = '${BillState}', BillZipCode = '${BillZipCode}', BillCountry = '${BillCountry}' WHERE  CardNumber = '${CardNumber}'`);
            console.log("User Billing Address Info Updated");
        } catch (err) {
            console.log(err);
        }

        console.log("Last");
    }
});

module.exports = router;
