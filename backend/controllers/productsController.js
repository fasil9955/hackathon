const db = require('../config/db');

// Get all products
exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM products';  // Query to fetch all products

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err.message);
            return res.status(500).send('Error fetching products.');
        }
        res.json(results);  // Send the list of products as a JSON response
    });
};

// Add a new product
exports.addProduct = (req, res) => {
    const { name, description, price, stock_level, reorder_point, category_id } = req.body;

    const query = `
        INSERT INTO products (name, description, price, stock_level, reorder_point, category_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(query, [name, description, price, stock_level, reorder_point, category_id], (err) => {
        if (err) {
            console.error('Error adding product:', err.message);
            return res.status(500).send('Error adding product.');
        }
        res.send('Product added successfully.');
    });
};

// Update an existing product
exports.updateProduct = (req, res) => {
    const { product_id } = req.params;
    const { name, description, price, stock_level, reorder_point, category_id } = req.body;

    const query = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, stock_level = ?, reorder_point = ?, category_id = ?
        WHERE product_id = ?
    `;

    db.query(query, [name, description, price, stock_level, reorder_point, category_id, product_id], (err) => {
        if (err) {
            console.error('Error updating product:', err.message);
            return res.status(500).send('Error updating product.');
        }
        res.send('Product updated successfully.');
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const { product_id } = req.params;

    const query = 'DELETE FROM products WHERE product_id = ?';  // Query to delete a product by ID

    db.query(query, [product_id], (err, results) => {
        if (err) {
            console.error('Error deleting product:', err.message);
            return res.status(500).send('Error deleting product.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Product not found.');
        }

        res.send('Product deleted successfully.');
    });
};
