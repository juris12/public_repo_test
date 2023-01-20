const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
 })
 module.exports = db