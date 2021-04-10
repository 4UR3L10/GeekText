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


//gets the all the wishlists of a specific user
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


//gets the list of books for the wishlist where wishlist_id === list_id
router.get('/list/:list_id', function (req, res) {

  const list_id = req.params.list_id;

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



//adds a new book to a wishlist
router.post('/list/:list', function (req, res) {
  const listID = req.params.list
  const { body } = req;
  const queryString = `
  INSERT INTO geektext.wishlist_book
  (wishlist_id, book_id)
  VALUES (${listID}, ${body.book_id})
  `;

  mysqlx.getSession(credentials) 
      .then(session => session.sql(queryString).execute())
      .then((_) => res.send(req.body))
      .catch((err) => {
          console.log(err)
          return res.status(500).send(`Server Error <br> ${err.info.msg}`);
      });
});


//adds a new wishlist
router.post('/user/:userid', function (req, res) {
  const userid = req.params.userid
  const { body } = req;

  const checkString = `SELECT count(*) FROM geektext.wishlist
  Where user_id = ${userid}`;

  const queryString = `
  INSERT INTO geektext.wishlist
  (user_id, wishlist_name)
  VALUES (${userid}, "${body.wishlist_name}")
  `;

  let db;

  mysqlx.getSession(credentials) 
      .then(session => {
        db = session
        return session.sql(checkString).execute()
      })
      .then((result) => result.fetchAll())
      .then((result) => {
        if(result[0][0] >= 3)
        {
          return res.status(400).send(`Too many wishlists`)
        }
        return db.sql(queryString).execute()
      })
      .then((_) => {
        res.send(req.body)
      })
      .catch((err) => {
          console.log(err)
          return res.status(500).send(`Server Error <br> ${err.info.msg}`);
      });
});


//updates the name of the wishlist where the user_id === user_id(paramater) and id === id(of wishlist)
router.put('/user/:user_id', function (req, res) {

  const { body } = req;

  const queryString = `
    UPDATE geektext.wishlist
    SET wishlist_name = "${body.wishlist_name}"
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


//deletes book in wishlist
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


//removes wishlist
router.delete('/user/:user/:list', function (req, res) {

  const list_id = req.params.list;
  const user_id = req.params.user;

  const queryString = `
  DELETE FROM geektext.wishlist
  WHERE id = ${list_id} AND user_id = '${user_id}';
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