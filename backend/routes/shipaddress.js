// Imports.
const { Router } = require("express");
const db = require("../db");
const router = Router();

// Default.
router.get("/", (req, res) => {
  console.log("Default Get ManageSettings");
});

// [Address] Insert User Information..
router.post("/newshipaddress", (req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Address = req.body.Address;
  const Address2 = req.body.Address2;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;

  if (FirstName && LastName && Address && City && State && ZipCode && Country) {
    try {
      db.promise().query(
        `INSERT INTO shipping_address VALUES('${0}','1','${FirstName}','${LastName}','${Address}','${Address2}','${City}','${State}','${ZipCode}','${Country}','N')` // CHANGE TO DYNAMIC USERRRRRR
      );
      console.log("User Shipping Address Inserted");
      res.status(201).send({ msg: "Shipping Address Inserted" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [Address] Get Information.
router.get("/getshipaddress", (req, res) => {
  try {
    db.promise().query(
      `SELECT * FROM shipping_address` // CHANGE TO DYNAMIC USERRRRRR
    );
    console.log("Data: " + res.data);
    res.status(200).send({ msg: "Done" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
