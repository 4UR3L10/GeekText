const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { 
    queryResultToJson, 
    userIdSchema, 
    bookIdSchema } = require('./util');
const Joi = require('joi');
const router = express.Router();

router.use(express.json());

const shoppingCartSchema = Joi.object({
    user_id: userIdSchema
        .required(),
    book_id: bookIdSchema
        .required(),
    cart_quantity: Joi.number()
        .integer()
        .min(1)
        .required(),
});

const savedLaterSchema = Joi.object({
    user_id: userIdSchema
        .required(),
    book_id: bookIdSchema
        .required()
});

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

// Get cart
router.get('/:id/cart', function (req, res) {
    const user_id = req.params.id
    if (!parseInt(user_id)) {
        return res.status(400).send(`Invalid user id input: ${user_id}`)
    }

    const queryString = `
    SELECT sh.book_id, sh.user_id, b.book_title, b.cover, a.author_name, b.price, sh.cart_quantity 
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

    const { body } = req;
    const { error } = shoppingCartSchema.validate(body);
    if (error) return res.status(400).json(error.message);

    const queryString = `
    INSERT INTO geektext.shopping_cart 
    (user_id, book_id, cart_quantity)
    VALUES (${body.user_id}, ${body.book_id}, ${body.cart_quantity})
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then((_) => res.send(req.body))
        .catch((err) => {
            console.log(err)
            return res.status(500).send(`Server Error <br> ${err.message}`);
        });
});

// Delete from cart
router.delete('/:id/cart/:book_id', function (req, res) {
    const schema = Joi.object({
        id: userIdSchema,
        book_id: bookIdSchema,
    });

    const { params } = req;
    const { error } = schema.validate(params);
    if (error) return res.status(400).json(error.message);

    const queryString = `
    DELETE FROM geektext.shopping_cart 
    WHERE user_id = ${params.id} AND book_id = '${params.book_id}';
    `;

    mysqlx.getSession(credentials)
        .then(session => session.sql(queryString).execute())
        .then((result) => res.status(200).send(`Deleted successfully <br> Affected Items: ${result.getAffectedItemsCount()}`))
        .catch((err) => {
            console.log(err)
            return res.status(500).send(`Server Error <br> ${err.message}`);
        });
});

// Update cart
router.put('/:id/cart/:book_id', function (req, res) {
    let schema = Joi.object({
        id: userIdSchema,
        book_id: bookIdSchema,
    });

    const { params } = req;
    let result = schema.validate(params);
    if (result.error) return res.status(400).json(result.error.message);

    const { body } = req;
    result = shoppingCartSchema.validate(body);
    if (result.error) return res.status(400).json(result.error.message);

    const queryString = `
    UPDATE geektext.shopping_cart 
    SET cart_quantity = ${body.cart_quantity}
    WHERE user_id = ${body.user_id} AND book_id = '${body.book_id}';
    `;

    let db;

    mysqlx.getSession(credentials)
        .then(session => {
            db = session;
            session.sql(queryString).execute();
        })
        .then((result) => {
            return db.sql(`SELECT * 
                FROM geektext.shopping_cart
                WHERE user_id = ${body.user_id} AND book_id = '${body.book_id}';
                 `).execute();
        })
        .then(result => queryResultToJson(result))
        .then(result => res.json(result))
        .catch((err) => {
            console.log(err)
            return res.status(500).send(`Server Error <br> ${err.message}`);
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


router.route('/:id/saved-books')
    // Get saved books
    .get((req, res) => {
        const user_id = req.params.id;
        const schema = Joi.object({
            id: userIdSchema.required()
        });

        const { error } = schema.validate(req.params);
        if (error) return res.status(400).json(error.message);

        const queryString = `
        SELECT sb.book_id, sb.user_id, b.book_title, b.cover, a.author_name, b.price
        FROM geektext.user_saved_book sb, geektext.book b, geektext.author_wrote_book w, geektext.author a
        WHERE sb.user_id = ${user_id} AND sb.book_id = b.id AND w.book_id = b.id AND w.author_id = a.id
        `;

        mysqlx.getSession(credentials)
            .then(session => session.sql(queryString).execute())
            .then(result => queryResultToJson(result))
            .then(result => {
                if (result.length == 0) return res.status(404).send(`No books are found`)
                return res.json(result)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('Server Error')
            });

    })
    // Add to saved books
    .post((req, res) => {
        const { body } = req;
        const { error } = savedLaterSchema.validate(body);
        if (error) return res.status(400).json(error.message);

        const queryString = `
        INSERT INTO geektext.user_saved_book
        (user_id, book_id)
        VALUES (${body.user_id}, ${body.book_id})
        `;

        mysqlx.getSession(credentials)
            .then(session => session.sql(queryString).execute())
            .then((_) => res.send(req.body))
            .catch((err) => {
                console.log(err)
                return res.status(500).send(`Server Error <br> ${err.message}`);
            });
    })

router.route('/:id/saved-books/:book_id')
    .delete((req, res) => {
        const schema = Joi.object({
            id: userIdSchema,
            book_id: bookIdSchema,
        });
    
        const { params } = req;
        const { error } = schema.validate(params);
        if (error) return res.status(400).json(error.message);
    
        const queryString = `
        DELETE FROM geektext.user_saved_book
        WHERE user_id = ${params.id} AND book_id = '${params.book_id}';
        `;
    
        mysqlx.getSession(credentials)
            .then(session => session.sql(queryString).execute())
            .then((result) => res.status(200).send(`Deleted successfully <br> Affected Items: ${result.getAffectedItemsCount()}`))
            .catch((err) => {
                console.log(err)
                return res.status(500).send(`Server Error <br> ${err.message}`);
            });
    })

module.exports = router