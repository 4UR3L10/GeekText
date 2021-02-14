const express = require('express');
const cors = require('cors');
const mysqlx = require('@mysql/xdevapi');
const app = express();

app.use(cors());

const credentials = {
    user: 'user',
    password: '123456',
    host: 'localhost',
    port: '33060',
};

app.get('/', (req, res) => {
    res.send('Wecome to GeekText RestAPI!')
});

app.get('/books', (req, res) => {
    const queryString = `SELECT * FROM geektext.book`;
    mysqlx.getSession(credentials)
        .then(session => {
            return session.sql(queryString).execute()
        })
        .then(result => {
            res.json({data: result.fetchAll()});
        });
});

app.listen(4000, () => {
    console.log('GeekText RestAPI server listening on port 4000...')
});