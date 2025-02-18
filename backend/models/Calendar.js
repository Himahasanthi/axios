const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  classesScheduled: [{
    subject: String,
    time: Date,
    duration: Number,
    room: String
  }],
  classInfo: {
    teacher: String,
    syllabus: String,
    requirements: [String]
  }
});

module.exports = mongoose.model('Calendar', calendarSchema);
