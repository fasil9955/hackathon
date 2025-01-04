const Supplier = require('../models/supplierModel');

// Add a new supplier
exports.addSupplier = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newSupplier = await Supplier.add({ name, email, phone });
    res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add supplier', error: error.message });
  }
};



// Edit a supplier by ID
exports.editSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedSupplier = await Supplier.edit(id, { name, email, phone });
    res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update supplier', error: error.message });
  }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.delete(id);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete supplier', error: error.message });
  }
};

// Fetch all suppliers
exports.viewAllSuppliers = async (req, res) => {
    try {
      const suppliers = await Supplier.getAll();
      res.status(200).json({ message: 'Suppliers fetched successfully', suppliers });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch suppliers', error: error.message });
    }
  };
  
  // Fetch a supplier by ID
  exports.viewSupplierById = async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.getById(id);
  
      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      res.status(200).json({ message: 'Supplier fetched successfully', supplier });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch supplier', error: error.message });
    }
  };
