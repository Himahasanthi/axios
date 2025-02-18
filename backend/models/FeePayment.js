const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feePaymentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' },
  amount: Number,
  receiptNumber: String,
  paidAt: Date,
  printedAt: Date
});

module.exports = mongoose.model('FeePayment', feePaymentSchema);
