const express = require('express');
const {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
} = require('../controllers/supplierController');

const router = express.Router();

// GET: Fetch all suppliers
router.get('/', getAllSuppliers);

// POST: Add a new supplier
router.post('/', addSupplier);

// PUT: Update a supplier by ID
router.put('/:id', updateSupplier);

// DELETE: Delete a supplier by ID
router.delete('/:id', deleteSupplier);

module.exports = router;
