const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();



router.get('/', function (req, res) {
  const queryString = `SELECT * FROM geektext.wishlist`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});


router.get('/user/:user', function (req, res) {

  const users_id = req.params.user;

  const queryString = `SELECT * FROM geektext.wishlist
  WHERE user_id = '${users_id}';`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});


router.get('/user/:user/listnames', function (req, res) {

  const users_id = req.params.user;

  const queryString = `SELECT wishlist_name FROM geektext.wishlist
  WHERE user_id = '${users_id}';`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});


router.get('/user/:user/listid', function (req, res) {

  const users_id = req.params.user;

  const queryString = `SELECT id FROM geektext.wishlist
  WHERE user_id = '${users_id}';`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});


router.get('/list/:list', function (req, res) {

  const list_id = req.params.list;

  const queryString = `SELECT * FROM geektext.wishlist_book WHERE wishlist_id = '${list_id}';`;

  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});


router.get('/list/:list/books', function (req, res) {

  const list_id = req.params.list;

  const queryString = `SELECT book_id FROM geektext.wishlist_book WHERE wishlist_id = '${list_id}';`;

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