import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["expense", "money in"] },
  budget_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
  },
  amount: { type: Number, required: true },
  account: {
    type: String,
    required: true,
    enum: ["bank", "mobile money"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
