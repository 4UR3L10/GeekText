const express = require('express')
const mysqlx = require('@mysql/xdevapi');
const credentials = require('./credentials');
const { queryResultToJson } = require('./util');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('This is the users page!!');
});

module.exports = router