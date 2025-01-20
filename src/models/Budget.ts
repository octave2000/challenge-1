import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  limit: { type: Number, required: true },
  totalSpent: { type: Number, default: 0 },
});

const Budget = mongoose.model('Budget', BudgetSchema);

export default Budget;
