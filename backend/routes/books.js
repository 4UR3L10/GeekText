const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();

/**
 * books/id: {
 *  book_id,
 *  title,
 *  description,
 *  book_cover,
 *  author_name,
 *  author_bio,
 *  genre,
 *  avg_rating,
 *  publisher_name,
 *  publisher_date,
 * }
 */

router.get('/', function (req, res) {
  const queryString = `
  SELECT w.book_id, book_title, description, price, b.cover, genre, avg_rating, author_name, author_bio, publisher_name, published_date
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a, geektext.book_published bp, geektext.publisher p
  WHERE w.author_id = a.id AND w.book_id = b.id AND bp.book_id = b.id AND bp.publisher_id = p.id;
  `;
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
    return res.status(400).send(`Invalid input: ${book_id}`)
  }

  const queryString = `
  SELECT w.book_id, book_title, description, price, b.cover, genre, avg_rating, author_name, author_bio, publisher_name, published_date
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a, geektext.book_published bp, geektext.publisher p
  WHERE b.id = '${book_id}' AND w.author_id = a.id AND w.book_id = b.id AND bp.book_id = b.id AND bp.publisher_id = p.id;
  `;
  
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


router.get('/:id/authors', (req, res) => {
  // Validate input
  const book_id = req.params.id
  if (!parseInt(book_id)) {
    return res.status(400).send(`Invalid input: ${book_id}`)
  }

  const queryString = `
  SELECT w.book_id, w.author_id, author_name, author_bio
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a
  WHERE b.id = '${book_id}' AND w.author_id = a.id AND w.book_id = b.id;
  `;
  
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

router.get('/:id/reviews', (req, res) => {
  // Validate input
  const book_id = req.params.id
  if (!parseInt(book_id)) {
    return res.status(400).send(`Invalid input: ${book_id}`)
  }

  const queryString = `
  SELECT *
  FROM geektext.user_book_review
  WHERE book_id = '${book_id}';
  `;
  
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