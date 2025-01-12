require('dotenv').config();
const mysql = require('mysql2');

// Konfigurasi koneksi
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle koneksi
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Tutup koneksi setelah setiap request (opsional, untuk serverless)
connection.on('error', (err) => {
  console.error('Database error:', err);
});

module.exports = connection;
