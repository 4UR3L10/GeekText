const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();


router.get('/', function (req, res) {
  const queryString = `SELECT * FROM geektext.author`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => res.json(queryResultToJson(result)))
    .catch((err) => console.log(err));
});

router.get('/:id', function (req, res) {
  const queryString = `SELECT * FROM geektext.author where id = ${req.params.id}`;
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => res.json(queryResultToJson(result)))
    .catch((err) => console.log(err));
});

router.get('/:id/books', function (req, res) {
  const author_id = req.params.id
  if (!parseInt(author_id)) return res.status(400).send(`Invalid input: ${author_id}`)
  

  const queryString = `
  SELECT w.book_id, book_title, description, price, b.cover, genre, avg_rating, author_name, author_bio, publisher_name, published_date
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a, geektext.book_published bp, geektext.publisher p
  WHERE a.id = ${author_id} AND w.author_id = a.id AND w.book_id = b.id AND bp.book_id = b.id AND bp.publisher_id = p.id;
  `;
  
  mysqlx.getSession(credentials)
    .then(session => session.sql(queryString).execute())
    .then(result => queryResultToJson(result))
    .then(result => {
      if (result.length == 0) return res.status(404).send(`Book with the given id is not found`)
      return res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Server Error')
    });
});

module.exports = router