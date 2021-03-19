const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const Joi = require('joi');
const router = express.Router();

router.use(express.json());


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

router.get('/:id/cart', function (req, res) {
    const user_id = req.params.id
    if (!parseInt(user_id)) {
        return res.status(400).send(`Invalid user id input: ${user_id}`)
    }

    const queryString = `
    SELECT b.book_title, b.cover, a.author_name, b.price, sh.cart_quantity
    FROM geektext.shopping_cart sh, geektext.book b, geektext.author_wrote_book w, geektext.author a
    WHERE sh.user_id = ${user_id} AND sh.book_id = b.id AND w.book_id = b.id AND w.author_id = a.id
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then(result => queryResultToJson(result))
        .then(result => {
            if (result.length == 0) return res.status(404).send(`No user or no books are found`)
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Server Error')
        });
});

// Add to cart
router.post('/:id/cart', function (req, res) {
    const schema = Joi.object({
        user_id: Joi.number()
            .integer()
            .min(1)
            .required(),
        book_id: Joi.number()
            .integer()
            .min(1000000000000)
            .max(9999999999999)
            .required(),
        cart_quantity: Joi.number()
            .integer()
            .min(1)
            .required(),
    });

    const { body } = req;

    const { error } = schema.validate(body);
    if (error) return res.status(400).json(error.details);

    const queryString = `
    INSERT INTO geektext.shopping_cart 
    (user_id, book_id, cart_quantity)
    VALUES (${body.user_id}, ${body.book_id}, ${body.cart_quantity})
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then ((_) => res.send(req.body))
        .catch((err) => {
            console.log(err)
            return res.status(500).send(`Server Error <br> ${err.info.msg}`);
        });

    
});



router.get('/:id/cart/:book_id', function (req, res) {
    const user_id = req.params.id
    const book_id = req.params.book_id
    if (!parseInt(user_id)) {
        return res.status(400).send(`Invalid user id input: ${user_id}`)
    } else if (!parseInt(book_id)) {
        return res.status(400).send(`Invalid book id input: ${book_id}`)
    }

    const queryString = `
    SELECT b.book_title, b.cover, a.author_name, b.price, sh.cart_quantity
    FROM geektext.shopping_cart sh, geektext.book b, geektext.author_wrote_book w, geektext.author a
    WHERE sh.user_id = ${user_id} AND sh.book_id = ${book_id} AND b.id = ${book_id}
    AND w.book_id = ${book_id} AND w.author_id = a.id
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then(result => queryResultToJson(result))
        .then(result => {
            if (result.length == 0) return res.status(404).send(`User or book not found`)
            return res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Server Error')
        });
});




module.exports = router