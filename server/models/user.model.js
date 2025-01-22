const db = require("../config/db_connect");

const user = (user) => {

};

user.getById = (id, callback) => {
    const sqlStr = "Select * FROM personnels WHERE ID = ? ";
    db.query(sqlStr, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(result);
    });
};

user.getByCode = async (code,callback) => {
    //let row = await db.query("SELECT * FROM users WHERE code = ?",[code]);
    let row = new Array();
    db.query("SELECT * FROM users WHERE code = 'MB8089'",(err, result) => {
        if (err) throw err;
        row[0] = result;
    });
    return callback(row);
};

user.getAllPaginate = (params, callback) => {

    const limit = params.limit;

    const sqlStr = "Select * FROM personnels order by updated_at desc limit "+limit+" offset 0";

    db.query(sqlStr, (err, result) => {
        if (err) {
            return err;
        }
        callback(result);
    });
};

module.exports = user;