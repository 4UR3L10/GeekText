const express = require("express");
const mysqlx = require("@mysql/xdevapi");
const credentials = require("./credentials");
const { queryResultToJson } = require("./util");
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

const sortOption = [
  "book_title",
  "author_name",
  "price",
  "avg_rating",
  "published_date",
];
const genreOptions = [
  "Manga",
  "Fiction",
  "Romance",
  "Sci-Fi",
  "Liturature",
  "Science & Technology",
];

router.get("/", function (req, res) {
  const { rating, genre, sortBy } = req.query;

  let queryString = `
  SELECT w.book_id, book_title, price, b.cover, genre, avg_rating, author_name, publisher_name, published_date
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a, geektext.book_published bp, geektext.publisher p
  WHERE w.author_id = a.id AND w.book_id = b.id AND bp.book_id = b.id AND bp.publisher_id = p.id
  `;

  if (rating) {
    if (Number.isNaN(Number.parseFloat(rating))) {
      return res.status(400).send(`Not a numner: ${rating}`);
    }
    queryString += `AND avg_rating >= ${rating}\n`;
  }

  if (genre) {
    if (!genreOptions.includes(genre)) {
      return res
        .status(400)
        .send(`${genre} in not a genre option. Options are: ${genreOptions}`);
    }
    queryString += `AND genre = '${genre}'\n`;
  }

  if (sortBy) {
    if (!sortOption.includes(sortBy)) {
      return res
        .status(400)
        .send(`${sortBy} is not a sort option. Options are: ${sortOption}`);
    }

    queryString += `ORDER BY ${sortBy} ASC;`;
  }

  mysqlx
    .getSession(credentials)
    .then((session) => session.sql(queryString).execute())
    .then((result) => queryResultToJson(result))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

router.get("/:id", (req, res) => {
  const book_id = req.params.id;
  if (!parseInt(book_id)) {
    return res.status(400).send(`Invalid book id input: ${book_id}`);
  }

  const queryString = `
  SELECT w.book_id, book_title, description, price, b.cover, genre, avg_rating, w.author_id, author_name, author_bio, publisher_name, published_date
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a, geektext.book_published bp, geektext.publisher p
  WHERE b.id = '${book_id}' AND w.author_id = a.id AND w.book_id = b.id AND bp.book_id = b.id AND bp.publisher_id = p.id;
  `;

  mysqlx
    .getSession(credentials)
    .then((session) => session.sql(queryString).execute())
    .then((result) => queryResultToJson(result))
    .then((result) => {
      // If not found, send 404 error
      if (result.length == 0) {
        return res.status(404).send(`Book with id ${book_id} is not found`);
      }
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      // If you don't know what happened, send 500
      res.status(500).send("Server Error");
    });
});

router.get("/:id/authors", (req, res) => {
  const book_id = req.params.id;
  if (!parseInt(book_id)) {
    return res.status(400).send(`Invalid input: ${book_id}`);
  }

  const queryString = `
  SELECT w.book_id, w.author_id, author_name, author_bio
  FROM geektext.author_wrote_book w, geektext.book b, geektext.author a
  WHERE b.id = '${book_id}' AND w.author_id = a.id AND w.book_id = b.id;
  `;

  mysqlx
    .getSession(credentials)
    .then((session) => session.sql(queryString).execute())
    .then((result) => queryResultToJson(result))
    .then((result) => {
      if (result.length == 0) {
        return res.status(404).send(`Book with id ${book_id} is not found`);
      }
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

router.get("/:id/reviews", (req, res) => {
  const book_id = req.params.id;
  if (!parseInt(book_id)) {
    return res.status(400).send(`Invalid book id input: ${book_id}`);
  }

  const queryString = `
  SELECT *
  FROM geektext.user_book_review
  WHERE book_id = '${book_id}';
  `;

  mysqlx
    .getSession(credentials)
    .then((session) => session.sql(queryString).execute())
    .then((result) => queryResultToJson(result))
    .then((result) => {
      if (result.length == 0) {
        return res.status(404).send(`Book with id ${book_id} is not found`);
      }
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

module.exports = router;
//https://expressjs.com/en/guide/routing.html
