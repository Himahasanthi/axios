const { FeePayment } = require('../models');

// Create Fee Payment
exports.createFeePayment = async (req, res) => {
  try {
    const newFeePayment = new FeePayment(req.body);
    await newFeePayment.save();
    res.status(201).json({ message: 'Fee payment created successfully', data: newFeePayment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Fee Payments
exports.getAllFeePayments = async (req, res) => {
  try {
    const feePayments = await FeePayment.find();
    res.status(200).json(feePayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Fee Payment by ID
exports.getFeePaymentById = async (req, res) => {
  try {
    const feePayment = await FeePayment.findById(req.params.id);
    if (!feePayment) {
      return res.status(404).json({ message: 'Fee payment not found' });
    }
    res.status(200).json(feePayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Fee Payment
exports.updateFeePayment = async (req, res) => {
  try {
    const updatedFeePayment = await FeePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFeePayment) {
      return res.status(404).json({ message: 'Fee payment not found' });
    }
    res.status(200).json({ message: 'Fee payment updated successfully', data: updatedFeePayment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Fee Payment
exports.deleteFeePayment = async (req, res) => {
  try {
    const deletedFeePayment = await FeePayment.findByIdAndDelete(req.params.id);
    if (!deletedFeePayment) {
      return res.status(404).json({ message: 'Fee payment not found' });
    }
    res.status(200).json({ message: 'Fee payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
