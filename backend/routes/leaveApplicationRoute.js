const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveApplicationController');
const authMiddleware = require("../middleware/authMiddleware");

// Student routes
router.post('/leave', leaveController.createLeaveApplication);
router.get('/leave',leaveController.getAllLeaveApplications);
router.get('/leave/:id',authMiddleware, leaveController.getLeaveApplicationById);
router.put('/leave/:id',authMiddleware ,leaveController.updateLeaveApplication);
router.delete('/leave/:id',authMiddleware, leaveController.deleteLeaveApplication);

module.exports = router;