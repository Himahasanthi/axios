const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require("../middleware/authMiddleware");


// Student routes
router.post('/attendance', attendanceController.markAttendance);
router.get('/attendance', attendanceController.getAllAttendance);
router.get('/attendance/:id', authMiddleware,attendanceController.getAttendanceById);
router.put('/attendance/:id', authMiddleware,attendanceController.updateAttendance);
router.delete('/attendance/:id', authMiddleware,attendanceController.deleteAttendance);
module.exports = router;