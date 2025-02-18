const { LeaveApplication } = require('../models');

// Create Leave Application
exports.createLeaveApplication = async (req, res) => {
  try {
    const newLeaveApplication = new LeaveApplication(req.body);
    await newLeaveApplication.save();
    res.status(201).json({ message: 'Leave application created successfully', data: newLeaveApplication });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Leave Applications
exports.getAllLeaveApplications = async (req, res) => {
  try {
    const leaveApplications = await LeaveApplication.find();
    res.status(200).json(leaveApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Leave Application by ID
exports.getLeaveApplicationById = async (req, res) => {
  try {
    const leaveApplication = await LeaveApplication.findById(req.params.id);
    if (!leaveApplication) {
      return res.status(404).json({ message: 'Leave application not found' });
    }
    res.status(200).json(leaveApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Leave Application
exports.updateLeaveApplication = async (req, res) => {
  try {
    const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLeaveApplication) {
      return res.status(404).json({ message: 'Leave application not found' });
    }
    res.status(200).json({ message: 'Leave application updated successfully', data: updatedLeaveApplication });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Leave Application
exports.deleteLeaveApplication = async (req, res) => {
  try {
    const deletedLeaveApplication = await LeaveApplication.findByIdAndDelete(req.params.id);
    if (!deletedLeaveApplication) {
      return res.status(404).json({ message: 'Leave application not found' });
    }
    res.status(200).json({ message: 'Leave application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
