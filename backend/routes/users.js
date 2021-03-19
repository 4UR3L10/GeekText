const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();

router.get('/', function (req, res) {
    const queryString = `SELECT * FROM geektext.user`;
    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then(result => queryResultToJson(result))
        .then(result => res.json(result))
        .catch((err) => {
            console.log(err)
            res.status(500).send('Server Error')
        });
});

router.get('/:id', function (req, res) {
    const user_id = req.params.id
    if (!parseInt(user_id)) {
        return res.status(400).send(`Invalid user id input: ${user_id}`)
    }

    const queryString = `
    SELECT * FROM geektext.user 
    WHERE id = ${user_id}
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then(result => queryResultToJson(result))
        .then(result => {
            if (result.length == 0) return res.status(404).send(`User with id ${user_id} is not found`)
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Server Error')
        });
});

module.exports = router