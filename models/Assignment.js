const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  total: Number,
  submitted: Boolean,
  pending: Boolean,
  overallProgress: Number,
  uploadedTo: {
    db: Boolean,
    timestamp: Date
  },
  recentAssignment: {
    data: Schema.Types.Mixed,
    fetchedFromDb: Date
  },
  pdf: {
    data: Buffer, // Stores PDF as binary data
    contentType: String, // Stores  type (e.g., application/pdf)
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
