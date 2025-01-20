import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  account: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
