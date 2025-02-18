const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const upload = require("../config/multerConfig");
const authMiddleware = require("../middleware/authMiddleware");

// Route to upload a PDF
router.post("/upload", upload.single("pdf"), assignmentController.uploadAssignment);
// Route to retrieve a PDF
router.get("/pdf/:id",authMiddleware, assignmentController.getAssignmentPdf);
// Student routes
router.post('/assignment', assignmentController.createAssignment);
router.get('/assignment', assignmentController.getAllAssignments);
router.get('/assignment/:id',authMiddleware, assignmentController.getAssignmentById);
router.put('/assignment/:id',authMiddleware, assignmentController.updateAssignment);
router.delete('/assignment/:id', authMiddleware,assignmentController.deleteAssignment);
module.exports = router;