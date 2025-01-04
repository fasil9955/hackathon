const express = require('express');
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController');

const router = express.Router();

// GET: Fetch all products
router.get('/', getAllProducts);

// POST: Add a new product
router.post('/', addProduct);

// PUT: Update a product by ID
router.put('/:id', updateProduct);

// DELETE: Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
