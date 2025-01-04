const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert a new user
    const query = `INSERT INTO users (username, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())`;

    // Execute the query with parameters
    db.query(query, [username, email, hashedPassword, role || 'Staff'], (err, results) => {
        if (err) {
            console.error('Error:', err);  // Log the actual error
            return res.status(500).send('Error registering user.');
        }
        res.send('User registered successfully.');
    });
};

/// Login user
exports.login = (req, res) => {
    const { email, password } = req.body;

    // SQL query to find the user by email
    const query = `SELECT * FROM users WHERE email = ?`;

    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid email or password.');
        }

        const user = results[0];

        // Check if password_hash exists
        if (!user.password_hash) {
            return res.status(500).send('Password hash not found.');
        }

        // Ensure the password is not empty
        if (!password) {
            return res.status(400).send('Password is required.');
        }

        // Compare the provided password with the stored hash
        try {
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                return res.status(401).send('Invalid email or password.');
            }

            // Create a JWT token
            const token = jwt.sign(
                { user_id: user.user_id, role: user.role },
                process.env.JWT_SECRET || 'secretKey',  // You can change 'secretKey' to a stronger secret key
                { expiresIn: '1h' }  // Token expires in 1 hour
            );

            // Send the token to the client
            res.json({ token });
        } catch (error) {
            return res.status(500).send('Error comparing password hash.');
        }
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';  // Query to select all users

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).send('Error fetching users.');
        }
        res.json(results);  // Send the list of users as a JSON response
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
    const { id } = req.params;  // Extract user_id from the request parameters

    const query = 'DELETE FROM users WHERE user_id = ?';  // Query to delete a user by ID

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err.message);
            return res.status(500).send('Error deleting user.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('User not found.');
        }

        res.send('User deleted successfully.');
    });
};