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
    console.log("Default Get Signup");
});

// [SignUp] Insert User Information..
router.post("/user", (req, res) => {
    const UserFirstName = req.body.UserFirstName;
    const UserLastName = req.body.UserLastName;
    const EmailAddress = req.body.EmailAddress;
    const Password = req.body.Password;
    const NickName = req.body.NickName;

    if (Password && EmailAddress && NickName && UserFirstName && UserLastName) {
        try {
            db.promise().query(`INSERT INTO user VALUES('${0}','${UserFirstName}','${UserLastName}','${NickName}','${Password}','${EmailAddress}','0')`);
            res.status(201).send({msg: "Created User"});
        } catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;
