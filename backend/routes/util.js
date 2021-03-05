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