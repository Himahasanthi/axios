const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examResultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  grade: String,
  subjectMarks: [{
    subject: String,
    marks: Number,
    outOf: Number
  }],
  accuracy: Number,
  performanceInsights: {
    strengths: [String],
    weaknesses: [String],
    improvement: [String]
  },
  recommendations: [String]
});

module.exports = mongoose.model('ExamResult', examResultSchema);
