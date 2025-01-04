const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Add a new supplier
router.post('/add', supplierController.addSupplier);

// Edit a supplier by ID
router.put('/edit/:id', supplierController.editSupplier);

// Delete a supplier by ID
router.delete('/delete/:id', supplierController.deleteSupplier);

// View all suppliers
router.get('/view', supplierController.viewAllSuppliers);

// View a supplier by ID
router.get('/view/:id', supplierController.viewSupplierById);

module.exports = router;
