const jwt = require("jsonwebtoken");
const Student = require("../models/StudentProfile");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils");

// Create a new student and generate tokens
exports.createStudent = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging log
    const student = new Student(req.body);
    await student.save();
    console.log("Saved Student:", student); // Debugging log
    const accessToken = generateAccessToken(student);
    const refreshToken = generateRefreshToken(student);
    student.refreshToken = refreshToken; 
    await student.save();
    res.status(201).json({ student, accessToken, refreshToken });
  } catch (err) {
    console.error("Error:", err.message); // Log error details
    res.status(400).json({ error: err.message });
  }
};

// Refresh Access Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).json({ message: "Refresh Token Required" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const student = await Student.findById(decoded.id);
    const newAccessToken = generateAccessToken(student);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Refresh Token" });
  }
};

// Get all students (No token needed)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student by ID
exports.updateStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student by ID
exports.deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
