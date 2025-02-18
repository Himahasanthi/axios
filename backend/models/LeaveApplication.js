const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveApplicationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  supportingDocuments: [{
    name: String,
    fileUrl: String,
    uploadedAt: Date 
  }],
  dbInfo: {
    status: String,
    submittedAt: Date
  },
  previousApplications: [{
    date: Date,
    status: String,
    reason: String
  }]
});

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema);
