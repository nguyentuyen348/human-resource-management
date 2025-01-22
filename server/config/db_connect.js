const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = db;


/*const MongoClient = require('mongodb').MongoClient;

const db = MongoClient.connect(process.env.MONGODB_URL, (err, db) => {
    if (err) throw err
})
module.exports = db;*/
