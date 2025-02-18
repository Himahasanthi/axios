const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require("../middleware/authMiddleware");

// Student routes
router.post('/analysis', analysisController.createAnalysis);
router.get('/analysis', analysisController.getAllAnalyses);
router.get('/analysis/:id', authMiddleware,analysisController.getAnalysisById);
router.put('/analysis/:id', authMiddleware,analysisController.updateAnalysis);
router.delete('/analysis/:id',authMiddleware,analysisController.deleteAnalysis);


module.exports = router;