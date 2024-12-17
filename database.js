require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: moviedatabase.cnkcimgy2cii.ap-southeast-2.rds.amazonaws.com,
    user: root,
    password: 19072005,
    database: Movie
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
