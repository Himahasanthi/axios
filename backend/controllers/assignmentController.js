const { Assignment } = require('../models');
const upload = require("../config/multerConfig"); 
// Create Assignment
exports.createAssignment = async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully', data: newAssignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    
    // Remove the pdf data (binary) from the response if it exists
    const assignmentsWithoutBinary = assignments.map(assignment => {
      if (assignment.pdf) {
        return {
          ...assignment.toObject(),
          pdf: {
            filename: assignment.pdf.filename,  // Only include filename and contentType
            contentType: assignment.pdf.contentType,
          }
        };
      }
      return assignment;
    });

    console.log(assignmentsWithoutBinary); // Check the response structure
    res.status(200).json(assignmentsWithoutBinary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Remove the binary data from the PDF field in the response
    if (assignment.pdf) {
      assignment.pdf = {
        filename: assignment.pdf.filename,  // Include only filename and contentType
        contentType: assignment.pdf.contentType,
      };
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Assignment
exports.updateAssignment = async (req, res) => {
  try {
    // Update the assignment by ID
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Remove binary data from the PDF field in the response
    if (updatedAssignment.pdf) {
      updatedAssignment.pdf = {
        filename: updatedAssignment.pdf.filename,  // Include only filename and contentType
        contentType: updatedAssignment.pdf.contentType,
      };
    }

    res.status(200).json({ message: 'Assignment updated successfully', data: updatedAssignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload assignment with PDF
exports.uploadAssignment = async (req, res) => {
  try {
    const { studentId, total, submitted, pending, overallProgress } = req.body;

    // Create a new assignment
    const newAssignment = new Assignment({
      student: studentId,
      total,
      submitted,
      pending,
      overallProgress,
      uploadedTo: {
        db: true,
        timestamp: new Date(),
      },
    });

    // If a file was uploaded, save it
    if (req.file) {
      newAssignment.pdf = {
        data: req.file.buffer, // This stores the binary data
        contentType: req.file.mimetype,
      };
    }

    await newAssignment.save();

    // Respond with the file path or a URL to access the file
    const filePath = `/uploads/assignments/${newAssignment._id}.pdf`; // Adjust this based on where you store files
    res.status(201).json({
      message: "Assignment uploaded successfully",
      newAssignment: {
        ...newAssignment.toObject(),
        fileUrl: filePath,  // Add file URL to the response
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve assignment PDF
exports.getAssignmentPdf = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || !assignment.pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.set("Content-Type", assignment.pdf.contentType);
    res.send(assignment.pdf.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

