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
  console.log("Default Get Signup");
});

// [SignUp] Insert User Information..
router.post("/user", (req, res) => {
  const UserFirstName = req.body.UserFirstName;
  const UserLastName = req.body.UserLastName;
  const EmailAddress = req.body.EmailAddress;
  const Password = req.body.Password;
  const NickName = req.body.NickName;

  let tempID = "";
  let tempAddID = "";

  if (Password && EmailAddress && NickName && UserFirstName && UserLastName) {
    try {
      db.promise().query(
        `INSERT INTO user VALUES('${0}','${UserFirstName}','${UserLastName}','${NickName}','${Password}','${EmailAddress}','0')`
      );

      db.promise()
        .query(
          `INSERT INTO address VALUES('${0}','NEW','NEW','NEW','NEW','NEW')`
        )
        .then((response) => {
          db.query(
            `SELECT id FROM user WHERE user_firstname = '${UserFirstName}' AND user_lastname = '${UserLastName}' AND nickname = '${NickName}' AND password = '${Password}' AND email = '${EmailAddress}'`,
            (error, results) => {
              if (results == "") {
                console.log("No results");
              } else {
                console.log("results: " + results[0].id);

                tempID = results[0].id;

                db.query(
                  `SELECT id FROM address WHERE street = 'NEW' AND city = 'NEW' AND state = 'NEW' AND zip_code = 'NEW' AND country = 'NEW'`,
                  (error, results) => {
                    if (results == "") {
                      console.log("No results");
                    } else {
                      console.log("results: " + results[0].id);

                      tempAddID = results[0].id;

                      db.promise().query(
                        `INSERT INTO user_home_address VALUES('${tempAddID}','${tempID}')`
                      );

                      db.promise().query(
                        `UPDATE address SET street = '', city = '', state = '', zip_code = '', country = '' WHERE id = '${tempAddID}'`
                      );
                    }
                  }
                );
              }
            }
          );
        });

      res.status(201).send({ msg: "Created User" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
