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
    console.log("Default Get SignIn");
});

// [SignIn] Retrieve & Compare User Information.
router.post("/user", (req, res) => {
    const EmailAddress = req.body.EmailAddress;
    const Password = req.body.Password;

    if (Password && EmailAddress) {
        db.query(`SELECT email, id, password FROM user WHERE email = '${EmailAddress}' AND password = '${Password}'`, (error, results) => {
            console.log("testing the valueP: " + results);

            if (results == "") {
                console.log("No results");
                return res.status(404).send("user not found");
            } else {
                console.log("results: " + results[0].email);
                console.log("results: " + results[0].id);
                return res.json(results);
            }
        });

        console.log("finished posting");
    }

});

module.exports = router;
