const express = require('express');
const router = express.Router();
const examResultController = require('../controllers/examResultController');
const authMiddleware = require("../middleware/authMiddleware");

// Student routes
router.post('/exam', examResultController.createExamResult);
router.get('/exam', examResultController.getAllExamResults);
router.get('/exam/:id', authMiddleware,examResultController.getExamResultById);
router.put('/exam/:id', authMiddleware,examResultController.updateExamResult);
router.delete('/exam/:id', authMiddleware,examResultController.deleteExamResult);
module.exports = router;