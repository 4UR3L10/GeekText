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
  const IdEmail = req.body.IdEmail;

  if (FirstName && LastName && Address && City && State && ZipCode && Country) {
    try {
      db.query(
        `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
        (error, results) => {
          if (results == "") {
            console.log("No results");
          } else {
            console.log("results: " + results[0].UserID);

            db.promise().query(
              `INSERT INTO shipping_address VALUES('${0}','${
                results[0].UserID
              }','${FirstName}','${LastName}','${Address}','${Address2}','${City}','${State}','${ZipCode}','${Country}','N')`
            );
            console.log("User Shipping Address Inserted");
            res.status(201).send({ msg: "Shipping Address Inserted" });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

// [Address] Get Information.
router.post("/getshipaddress", (req, res) => {
  const IdEmail = req.body.IdEmail;

  try {
    db.query(
      `SELECT UserID FROM user WHERE EmailAddress = '${IdEmail}'`,
      (error, results) => {
        if (results == "") {
          console.log("No results");
        } else {
          db.query(
            `SELECT * FROM shipping_address WHERE UserID = '${results[0].UserID}'`,
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

// [Address] Delete Information.
router.post("/deleteshipaddress", (req, res) => {
  const ShipAddressID = req.body.ShipAddressID;
  try {
    db.query(
      `DELETE FROM shipping_address WHERE ShipAddressID = '${ShipAddressID}'`
    );
  } catch (err) {
    console.log(err);
  }
});

// [Address] Update User Information..
router.post("/updateshipaddress", (req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Address = req.body.Address;
  const Address2 = req.body.Address2;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;
  const ShipAddressID = req.body.ShipAddressID;

  if (ShipAddressID) {
    try {
      db.promise().query(
        `UPDATE shipping_address SET FirstName = '${FirstName}', LastName = '${LastName}', Address = '${Address}', Address2 = '${Address2}', City = '${City}', State = '${State}', ZipCode = '${ZipCode}', Country = '${Country}' WHERE ShipAddressID = '${ShipAddressID}'`
      );
      console.log("User Shipping Address Updated");
      res.status(201).send({ msg: "Shipping Address Updated" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
