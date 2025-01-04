const db = require('../config/db');

// Add a new supplier
exports.add = async (supplier) => {
  const { name, email, phone } = supplier;
  const [result] = await db.query(
    'INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  return { id: result.insertId, ...supplier };
};

// Edit a supplier by ID
exports.edit = async (id, supplier) => {
  const { name, email, phone } = supplier;
  await db.query(
    'UPDATE suppliers SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, id]
  );
  return { id, ...supplier };
};

// Delete a supplier by ID
exports.delete = async (id) => {
  await db.query('DELETE FROM suppliers WHERE id = ?', [id]);
};

// Fetch all suppliers
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM suppliers');
  return rows;
};

// Fetch a supplier by ID
exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM suppliers WHERE id = ?', [id]);
  return rows[0]; // Return the first row or undefined if not found
};
