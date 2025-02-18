const express = require('express');
const router = express.Router();
const feePaymentController = require('../controllers/feePaymentController');
const authMiddleware = require("../middleware/authMiddleware");

// Student routes
router.post('/fee', feePaymentController.createFeePayment);
router.get('/fee', authMiddleware,feePaymentController.getAllFeePayments);
router.get('/fee/:id', authMiddleware,feePaymentController.getFeePaymentById);
router.put('/fee/:id', authMiddleware,feePaymentController.updateFeePayment);
router.delete('/fee/:id',authMiddleware, feePaymentController.deleteFeePayment);
module.exports = router;