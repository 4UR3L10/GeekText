const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();
router.use(express.json());



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



router.post('/list/:list', function (req, res) {
  const { body } = req;
  const queryString = `
  INSERT INTO geektext.wishlist_book
  (wishlist_id, book_id)
  VALUES (${body.wishlist_id}, ${body.book_id})
  `;

  mysqlx.getSession(credentials) 
      .then(session => session.sql(queryString).execute())
      .then((_) => res.send(req.body))
      .catch((err) => {
          console.log(err)
          return res.status(500).send(`Server Error <br> ${err.info.msg}`);
      });
});


router.put('/user/:list', function (req, res) {

  const { body } = req;

  const queryString = `
    UPDATE geektext.wishlist
    SET wishlist_name = ${body.wishlist_name}
    WHERE user_id = ${body.user_id} AND id = '${body.id}';
    `;

    let db;

    mysqlx.getSession(credentials)
        .then(session => {
            db = session;
            session.sql(queryString).execute();
        })
        .then((result) => {
            return db.sql(`SELECT * 
                FROM geektext.wishlist
                WHERE user_id = ${body.user_id} AND id = '${body.id}';
                 `).execute();
        })
        .then(result => queryResultToJson(result))
        .then(result => res.json(result))
        .catch((err) => {
            console.log(err)
            return res.status(500).send(`Server Error <br> ${err.info.msg}`);
        });
});


router.delete('/list/:list/:book', function (req, res) {

  const list_id = req.params.list;
  const book_id = req.params.book;

  const queryString = `
  DELETE FROM geektext.wishlist_book
  WHERE wishlist_id = ${list_id} AND book_id = '${book_id}';
  `;

  mysqlx.getSession(credentials)
      .then(session => session.sql(queryString).execute())
      .then((result) => res.status(200).send(`Deleted successfully <br> Affected Items: ${result.getAffectedItemsCount()}`))
      .catch((err) => {
          console.log(err)
          return res.status(500).send(`Server Error <br> ${err.info.msg}`);
      });
});

module.exports = router