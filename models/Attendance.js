const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  monthlyStorage: {
    month: Date,
    present: Number,
    absent: Number,
    late: Number,
    leave: Number
  },
  records: [{
    date: Date,
    status: {
      type: String,
      enum: ['present', 'late', 'leave', 'absent']
    }
  }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
