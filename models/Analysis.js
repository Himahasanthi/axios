const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  studies: {
    averageScore: Number,
    studyHours: Number,
    assignmentsSubmitted: Number,
    rank: Number
  },
  recentAchievements: [{
    title: String,
    date: Date,
    description: String
  }],
  recommendations: [{
    area: String,
    suggestion: String,
    priority: String
  }]
});

module.exports = mongoose.model('Analysis', analysisSchema);
