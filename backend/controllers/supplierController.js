const db = require('../config/db'); // Assuming your DB connection is in the config/db.js file

// Get all suppliers
exports.getAllSuppliers = (req, res) => {
    const query = 'SELECT * FROM suppliers';  // Query to fetch all suppliers

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching suppliers:', err.message);
            return res.status(500).send('Error fetching suppliers.');
        }
        res.json(results);  // Send the list of suppliers as a JSON response
    });
};

exports.addSupplier = (req, res) => {
    const { name, contact_email, phone_number, address } = req.body;

    // Check if supplier with the same email already exists
    const checkQuery = 'SELECT * FROM suppliers WHERE contact_email = ?';
    db.query(checkQuery, [contact_email], (err, existingSupplier) => {
        if (err) {
            console.error('Error checking supplier existence:', err.message);
            return res.status(500).send('Error checking supplier existence.');
        }

        if (existingSupplier.length > 0) {
            return res.status(400).send('Supplier with this email already exists.');
        }

        // Insert new supplier
        const query = `
            INSERT INTO suppliers (name, contact_email, phone_number, address, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        db.query(query, [name, contact_email, phone_number, address], (err) => {
            if (err) {
                console.error('Error adding supplier:', err.message);
                return res.status(500).send('Error adding supplier.');
            }
            res.send('Supplier added successfully.');
        });
    });
};


// Update an existing supplier
exports.updateSupplier = (req, res) => {
    const { supplier_id } = req.params;
    const { supplier_name, contact_email, phone_number, address } = req.body;

    // Check if supplier with the same email exists but not the current supplier
    const checkQuery = 'SELECT * FROM suppliers WHERE contact_email = ? AND supplier_id != ?';
    db.query(checkQuery, [contact_email, supplier_id], (err, existingSupplier) => {
        if (err) {
            console.error('Error checking supplier existence:', err.message);
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
        db.query(query, [supplier_name, contact_email, phone_number, address, supplier_id], (err) => {
            if (err) {
                console.error('Error updating supplier:', err.message);
                return res.status(500).send('Error updating supplier.');
            }
            res.send('Supplier updated successfully.');
        });
    });
};

// Delete a supplier
exports.deleteSupplier = (req, res) => {
    const { supplier_id } = req.params;

    const query = 'DELETE FROM suppliers WHERE supplier_id = ?';  // Query to delete a supplier by ID

    db.query(query, [supplier_id], (err, results) => {
        if (err) {
            console.error('Error deleting supplier:', err.message);
            return res.status(500).send('Error deleting supplier.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Supplier not found.');
        }

        res.send('Supplier deleted successfully.');
    });
};
