const Joi = require('joi');

//https://dev.mysql.com/doc/x-devapi-userguide/en/result-set-classes.html
exports.queryResultToJson = (result) => {
    let jsonResult = [];
    const rows = result.fetchAll();
    const cols = result.getColumns()

    rows.forEach(row => {
        var obj = {};
        cols.forEach((col, i) => {
            obj[col.getColumnName()] = row[i];
        });
        jsonResult.push(obj);
    });

    return jsonResult;
}

exports.userIdSchema = Joi.number()
    .integer()
    .min(1);

exports.bookIdSchema = Joi.number()
    .integer()
    .min(1000000000000)
    .max(9999999999999);
