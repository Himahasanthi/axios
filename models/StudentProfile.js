const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentProfileSchema = new Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  grade: String,
  attendance: {
    present: Number,
    absent: Number,
    late: Number,
  },
  gpa: Number,
  contactInformation: {
    phoneNo: String,
    email: { type: String, required: true },
    address: String,
  },
  
});

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
