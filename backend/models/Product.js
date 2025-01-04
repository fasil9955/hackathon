const db = require('../config/db');

const Product = {
    create: (data, callback) => {
        const query = `INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)`;
        db.query(query, [data.name, data.description, data.price, data.quantity], callback);
    },

    findAll: (callback) => {
        const query = `SELECT * FROM products`;
        db.query(query, callback);
    },

    updateById: (id, data, callback) => {
        const query = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE product_id = ?`;
        db.query(query, [data.name, data.description, data.price, data.quantity, id], callback);
    },

    deleteById: (id, callback) => {
        const query = `DELETE FROM products WHERE product_id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Product;
