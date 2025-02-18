const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/students", studentController.createStudent);
router.post("/refresh-token", studentController.refreshToken);

// Protected Routes
router.get("/students", studentController.getAllStudents);
router.get("/students/:id", authMiddleware, studentController.getStudentById);
router.put("/students/:id", authMiddleware, studentController.updateStudentById);
router.delete("/students/:id", authMiddleware, studentController.deleteStudentById);

module.exports = router;
