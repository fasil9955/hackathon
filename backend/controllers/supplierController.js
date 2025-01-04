const db = require('../db'); // Assuming your DB connection is in the db.js file

// Fetch all suppliers
exports.getAllSuppliers = (req, res) => {
    const query = 'SELECT * FROM suppliers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching suppliers.');
        }
        res.json(results);
    });
};

// Add a new supplier
exports.addSupplier = (req, res) => {
    const { supplier_name, contact_email, phone_number, address, user_id } = req.body;

    // Check if supplier with the same email already exists
    const checkQuery = 'SELECT * FROM suppliers WHERE contact_email = ?';
    db.query(checkQuery, [contact_email], (err, existingSupplier) => {
        if (err) {
            return res.status(500).send('Error checking supplier existence.');
        }

        if (existingSupplier.length > 0) {
            return res.status(400).send('Supplier with this email already exists.');
        }

        // Insert new supplier
        const query = `
            INSERT INTO suppliers (supplier_name, contact_email, phone_number, address, user_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [supplier_name, contact_email, phone_number, address, user_id], (err) => {
            if (err) {
                return res.status(500).send('Error adding supplier.');
            }
            res.send('Supplier added successfully.');
        });
    });
};

// Update a supplier by ID
exports.updateSupplier = (req, res) => {
    const { id } = req.params;
    const { supplier_name, contact_email, phone_number, address } = req.body;

    // Check if supplier with the same email exists but not the current supplier
    const checkQuery = 'SELECT * FROM suppliers WHERE contact_email = ? AND supplier_id != ?';
    db.query(checkQuery, [contact_email, id], (err, existingSupplier) => {
        if (err) {
            return res.status(500).send('Error checking supplier existence.');
        }

        if (existingSupplier.length > 0) {
            return res.status(400).send('Supplier with this email already exists.');
        }

        // Update supplier details
        const query = `
            UPDATE suppliers
            SET supplier_name = ?, contact_email = ?, phone_number = ?, address = ?
            WHERE supplier_id = ?
        `;
        db.query(query, [supplier_name, contact_email, phone_number, address, id], (err) => {
            if (err) {
                return res.status(500).send('Error updating supplier.');
            }
            res.send('Supplier updated successfully.');
        });
    });
};

// Delete a supplier by ID
exports.deleteSupplier = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM suppliers WHERE supplier_id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send('Error deleting supplier.');
        }
        res.send('Supplier deleted successfully.');
    });
};
