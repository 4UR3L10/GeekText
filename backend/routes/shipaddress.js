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

// [Address] Insert User Information..
router.post("/newshipaddress", (req, res) => {
  const Address = req.body.Address;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;
  const UserID = req.body.UserID;

  if (Address && City && State && ZipCode && Country && UserID) {
    try {
      db.promise()
        .query(
          `INSERT INTO address VALUES('${0}','${Address}','${City}','${State}','${ZipCode}','${Country}')`
        )
        .then((response) => {
          db.query(
            `SELECT id FROM address WHERE street = '${Address}'`,
            (error, results) => {
              if (results == "") {
                console.log("No results");
              } else {
                console.log("results: " + results[0].id);

                db.promise().query(
                  `INSERT INTO user_shipping_address VALUES('${results[0].id}','${UserID}')`
                );
              }
            }
          );
        });

      console.log("User Shipping Address Inserted");
      //res.status(201).send({ msg: "Shipping Address Inserted" });
    } catch (err) {
      console.log(err);
    }
  }
});

// [Address] Get Information.
router.post("/getshipaddress", (req, res) => {
  const UserID = req.body.UserID;

  try {
    db.query(
      `SELECT * FROM address WHERE id IN (SELECT address_id FROM user_shipping_address WHERE user_id = '${UserID}')`,
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

// [Address] Delete Information.
router.post("/deleteshipaddress", (req, res) => {
  const ShipAddressID = req.body.ShipAddressID;

  try {
    db.query(`DELETE FROM address WHERE id = '${ShipAddressID}'`);
    db.query(
      `DELETE FROM user_shipping_address WHERE address_id = '${ShipAddressID}'`
    );
  } catch (err) {
    console.log(err);
  }
});

// [Address] Update User Information..
router.post("/updateshipaddress", (req, res) => {
  const Address = req.body.Address;
  const City = req.body.City;
  const State = req.body.State;
  const ZipCode = req.body.ZipCode;
  const Country = req.body.Country;
  const ShipAddressID = req.body.ShipAddressID;

  if (ShipAddressID) {
    try {
      db.promise().query(
        `UPDATE address SET street = '${Address}', city = '${City}', state = '${State}', zip_code = '${ZipCode}', country = '${Country}' WHERE id = '${ShipAddressID}'`
      );
      console.log("User Shipping Address Updated");
      res.status(201).send({ msg: "Shipping Address Updated" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
