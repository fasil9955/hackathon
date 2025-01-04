const db = require('../config/db');

const Supplier = {
    create: (data, callback) => {
        const query = `INSERT INTO suppliers (name, contact_info) VALUES (?, ?)`;
        db.query(query, [data.name, data.contact_info], callback);
    },

    findAll: (callback) => {
        const query = `SELECT * FROM suppliers`;
        db.query(query, callback);
    },

    updateById: (id, data, callback) => {
        const query = `UPDATE suppliers SET name = ?, contact_info = ? WHERE supplier_id = ?`;
        db.query(query, [data.name, data.contact_info, id], callback);
    },

    deleteById: (id, callback) => {
        const query = `DELETE FROM suppliers WHERE supplier_id = ?`;
        db.query(query, [id], callback);
    },
};

module.exports = Supplier;
