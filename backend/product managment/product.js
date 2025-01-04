//imports 
//db connection 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('You not have access to the page.');

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only can access.');
    }
    next();
};

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM Products';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products.');
        } else {
            res.json(results);
        }
    });
});

app.post('/products',verifyToken, isAdmin, (req, res) => {
    const { product_id, product_name, quantity, price, reorder, description, user_id } = req.body;
    const query = `INSERT INTO Products (product_id, product_name, quantity, price, reorder, description, user_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [product_id, product_name, quantity, price, reorder, description, user_id], (err) => {
        if (err) {
            res.status(500).send('Errorrr.');
        } else {
            res.send('added successfully.');
        }
    });
});

app.put('/products/:id', verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const { product_name, quantity, price, reorder, description } = req.body;
    const query = `UPDATE Products SET product_name = ?, quantity = ?, price = ?, reorder = ?, description = ? WHERE product_id = ?`;
    db.query(query, [product_name, quantity, price, reorder, description, id], (err) => {
        if (err) {
            res.status(500).send('Error in  updating product.');
        } else {
            res.send('Product updated successfully.');
        }
    });
});

app.delete('/products/:id',verifyToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Products WHERE product_id = ?`;
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send('Error deleting product.');
        } else {
            res.send('Product deleted successfully.');
        }
    });
});

