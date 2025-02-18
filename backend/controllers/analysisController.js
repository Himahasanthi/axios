const { Analysis } = require('../models');

// Create Analysis
exports.createAnalysis = async (req, res) => {
  try {
    const newAnalysis = new Analysis(req.body);
    await newAnalysis.save();
    res.status(201).json({ message: 'Analysis created successfully', data: newAnalysis });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Analyses
exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find();
    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Analysis by ID
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Analysis
exports.updateAnalysis = async (req, res) => {
  try {
    const updatedAnalysis = await Analysis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnalysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({ message: 'Analysis updated successfully', data: updatedAnalysis });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const deletedAnalysis = await Analysis.findByIdAndDelete(req.params.id);
    if (!deletedAnalysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.status(200).json({ message: 'Analysis deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
