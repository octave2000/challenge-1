import type { Request, Response } from 'express';
import Transaction from '../models/transaction';
import Budget from '../models/Budget';


export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, account, category, subcategory } = req.body;
    const transaction = new Transaction({ type, amount, account, category, subcategory });
    const savedTransaction = await transaction.save();

    if (type === 'expense') {
      const budget = await Budget.findOne();
      if (budget) {
        budget.totalSpent += amount;
        await budget.save();
      }
    }

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
  }
};


export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { account } = req.query;
    const query = account ? { account } : {};
    const transactions = await Transaction.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
  }
};


export const generateReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
  }
};


export const setBudget = async (req: Request, res: Response) => {
  try {
    const { limit } = req.body;
    let budget = await Budget.findOne();

    if (budget) {
      budget.limit = limit;
    } else {
      budget = new Budget({ limit });
    }
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
  }
};


export const getBudgetStatus = async (req: Request, res: Response) : Promise<any>=> {
    try {
      const budget = await Budget.findById({_id:req.params.id});
      if (!budget) return res.status(404).json({ message: 'Budget not set.' });
  
      const isExceeded = budget.totalSpent > budget.limit;
      return res.status(200).json({
        limit: budget.limit,
        totalSpent: budget.totalSpent,
        exceeded: isExceeded,
      });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
    }
  };


export const summaryData = async (req: Request, res: Response) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: { category: '$category', subcategory: '$subcategory' },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error.' });
  }
};
