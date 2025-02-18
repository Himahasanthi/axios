const { ExamResult } = require('../models');

// Create Exam Result
exports.createExamResult = async (req, res) => {
  try {
    const newExamResult = new ExamResult(req.body);
    await newExamResult.save();
    res.status(201).json({ message: 'Exam result created successfully', data: newExamResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Exam Results
exports.getAllExamResults = async (req, res) => {
  try {
    const examResults = await ExamResult.find();
    res.status(200).json(examResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Exam Result by ID
exports.getExamResultById = async (req, res) => {
  try {
    const examResult = await ExamResult.findById(req.params.id);
    if (!examResult) {
      return res.status(404).json({ message: 'Exam result not found' });
    }
    res.status(200).json(examResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Exam Result
exports.updateExamResult = async (req, res) => {
  try {
    const updatedExamResult = await ExamResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExamResult) {
      return res.status(404).json({ message: 'Exam result not found' });
    }
    res.status(200).json({ message: 'Exam result updated successfully', data: updatedExamResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Exam Result
exports.deleteExamResult = async (req, res) => {
  try {
    const deletedExamResult = await ExamResult.findByIdAndDelete(req.params.id);
    if (!deletedExamResult) {
      return res.status(404).json({ message: 'Exam result not found' });
    }
    res.status(200).json({ message: 'Exam result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
