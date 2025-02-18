const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const authMiddleware = require("../middleware/authMiddleware");

// Student routes
router.post('/calender', calendarController.createEvent);
router.get('/calender', calendarController.getAllEvents);
router.get('/calender/:id', authMiddleware,calendarController.getEventById);
router.put('/calender/:id', authMiddleware,calendarController.updateEvent);
router.delete('/calender/:id', authMiddleware,calendarController.deleteEvent);
module.exports = router;