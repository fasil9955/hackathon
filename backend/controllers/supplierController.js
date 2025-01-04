// Imports

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('You do not have access to this page.');

    jwt.verify(token, process.env.JWT_SECRET || 'secretKey', (err, decoded) => {
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

// Get all suppliers
app.get('/suppliers', (req, res) => {
    const query = 'SELECT * FROM suppliers';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching suppliers.');
        } else {
            res.json(results);
        }
    });
});

// Add a supplier
app.post('/suppliers', verifyToken, isAdmin, (req, res) => {
    const { name, contact_email, phone_number, address } = req.body;
    const query = `INSERT INTO suppliers (name, contact_email, phone_number, address) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [name, contact_email, phone_number, address], (err) => {
        if (err) {
            res.status(500).send('Error adding supplier.');
        } else {
            res.send('Supplier added successfully.');
        }
    });
});

// Update a supplier
app.put('/suppliers/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const { name, contact_email, phone_number, address } = req.body;
    const query = `UPDATE suppliers 
                   SET name = ?, contact_email = ?, phone_number = ?, address = ? 
                   WHERE supplier_id = ?`;
    db.query(query, [name, contact_email, phone_number, address, id], (err) => {
        if (err) {
            res.status(500).send('Error updating supplier.');
        } else {
            res.send('Supplier updated successfully.');
        }
    });
});

// Delete a supplier
app.delete('/suppliers/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM suppliers WHERE supplier_id = ?`;
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send('Error deleting supplier.');
        } else {
            res.send('Supplier deleted successfully.');
        }
    });
});

