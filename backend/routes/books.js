const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();


router.get('/', function (req, res) {
  const queryString = `SELECT * FROM geektext.book`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => console.log(err));
});


router.get('/:id', (req, res) => {
  // Validate input
  const book_id = req.params.id
  if (!parseInt(book_id)) {
    console.log('ho')
    return res.status(400).send(`Invalid input: ${book_id}`)
  }

  const queryString = `SELECT * FROM geektext.book WHERE id = '${book_id}'`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => {
      // If not found, send 404 error
      if (result.length == 0) {
        return res.status(404).send(`Book with the given id is not found`)
      }
      return res.json(result)
    })
    .catch((err) => {
      console.log(err)
      // If you don't know what happened, send 500
      res.status(500).send('Server Error')
    });
});

module.exports = router
//https://expressjs.com/en/guide/routing.html