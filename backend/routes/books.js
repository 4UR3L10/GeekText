const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();


router.get('/', function (req, res) {
  const queryString = `SELECT * FROM geektext.book`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => res.json(queryResultToJson(result)))
    .catch((err) => console.log(err));
});


router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM geektext.book WHERE id = '${req.params.id}'`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => {
      res.json(queryResultToJson(result));
    })
    .catch((err) => console.log(err));
});

module.exports = router
//https://expressjs.com/en/guide/routing.html