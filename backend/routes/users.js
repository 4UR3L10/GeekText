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

module.exports = router