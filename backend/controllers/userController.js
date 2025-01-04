// Imports
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const db = require('./config/db'); // Adjust path as necessary
// const app = express();

// app.use(express.json()); // For parsing JSON bodies

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('You do not have access to the page.');

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });
};

// Check Admin Middleware
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only can access.');
    }
    next();
};

// Get all users
app.get('/users', verifyToken, isAdmin, (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching users.');
        } else {
            res.json(results);
        }
    });
});

// Add a user
app.post('/users', verifyToken, isAdmin, (req, res) => {
    const { user_id, username, password, role } = req.body;
    const query = `INSERT INTO Users (user_id, username, password, role) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [user_id, username, password, role], (err) => {
        if (err) {
            res.status(500).send('Error adding user.');
        } else {
            res.send('User added successfully.');
        }
    });
});

// Update a user
app.put('/users/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const query = `UPDATE Users SET username = ?, password = ?, role = ? WHERE user_id = ?`;
    db.query(query, [username, password, role, id], (err) => {
        if (err) {
            res.status(500).send('Error updating user.');
        } else {
            res.send('User updated successfully.');
        }
    });
});

// Delete a user
app.delete('/users/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Users WHERE user_id = ?`;
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send('Error deleting user.');
        } else {
            res.send('User deleted successfully.');
        }
    });
});
