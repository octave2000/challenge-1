import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  limit: { type: Number, required: true },
  totalSpent: { type: Number, default: 0 },
});

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
