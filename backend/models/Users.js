const db = require('../config/db');

const User = {
    create: (data, callback) => {
        const query = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
        db.query(query, [data.username, data.email, data.password, data.role], callback);
    },

    findByEmail: (email, callback) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.query(query, [email], callback);
    },

    findAll: (callback) => {
        const query = `SELECT user_id, username, email, role FROM users`;
        db.query(query, callback);
    },

    deleteById: (id, callback) => {
        const query = `DELETE FROM users WHERE user_id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = User;
