const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('../js/database'); 
const app = express();

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root
app.get('/', (req, res) => {
    res.send('Welcome to MediaHeaven API!');
});

// Endpoint untuk registration -> jadi nanti di panggil, lalu response balik
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO Akun (username, email, password) VALUES (?, ?, ?)';

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    connection.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error saving data to the database.');
        }
        res.status(200).send('Registration successful!');
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const query = `
        SELECT *
        FROM Akun
        WHERE (username = ? OR email = ?)
          AND password = ?
    `;

    connection.query(query, [username, username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal server error.');
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Login successful', user: results[0] });
        } else {
            return res.status(401).send('Invalid username or password.');
        }
    });
});

// Endpoint untuk menambahkan film ke table Wishlist
app.post('/add-to-wishlist', (req, res) => {
    const { id_movie, username } = req.body;

    if (!id_movie || !username) {
        return res.status(400).json({ message: 'ID Movie dan Username diperlukan.' });
    }

    const checkQuery = 'SELECT * FROM Wishlist WHERE id_movie = ? AND id_akun = ?';
    connection.query(checkQuery, [id_movie, username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error memeriksa data di database.' });
        }

        if (results.length > 0) {
            // Jika sudah ada, kirimkan pesan bahwa film sudah ada di wishlist
            return res.status(400).json({ message: 'Film sudah ada di Wishlist.' });
        }

        // Jika belum ada, lakukan INSERT
        const insertQuery = 'INSERT INTO Wishlist (id_movie, id_akun) VALUES (?, ?)';
        connection.query(insertQuery, [id_movie, username], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Error memasukkan data ke database.' });
            }
            res.status(200).json({ message: 'Film berhasil ditambahkan ke Wishlist!' });
        });
    });
});

// masukin data ke wishlist
app.get('/wishlist', (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    connection.query(
        'SELECT id_movie FROM Wishlist WHERE id_akun = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error('Error fetching wishlist:', err);
                return res.status(500).send('Failed to fetch wishlist');
            }

            if (results.length === 0) {
                return res.status(404).send('No movies found in wishlist for this user');
            }

            res.json(results);
        }
    );
});

// hapus wishlist
app.delete('/wishlist', (req, res) => {
    const { id_movie, username } = req.body;

    if (!id_movie || !username) {
        return res.status(400).send('Movie ID and Username are required.');
    }

    connection.query(
        'DELETE FROM Wishlist WHERE id_movie = ? AND id_akun = ?',
        [id_movie, username],
        (err, result) => {
            if (err) {
                console.error('Error removing movie from wishlist:', err);
                return res.status(500).send('Failed to remove movie from wishlist');
            }

            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Movie removed from wishlist!' });
            } else {
                res.status(404).json({ message: 'Movie not found in wishlist.' });
            }
        }
    );
});

//untuk community
app.post("/addPost", (req, res) => {
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const query = "INSERT INTO Community (comment) VALUES (?)";
    connection.query(query, [comment], (err, result) => {
        if (err) {
            console.error("Error inserting comment:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Comment added successfully", id: result.insertId });
    });
});

app.get("/getPosts", (req, res) => {
    const query = "SELECT * FROM Community";
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching posts:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
