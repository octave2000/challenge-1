import type { Request, Response } from "express";

import Budget from "../models/Budget";

export const setBudget = async (req: Request, res: Response) => {
  try {
    const { name, limit } = req.body;

    const budget = new Budget({ name, limit });
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const getBudgetStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.body;
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ message: "Budget not found." });

    const isExceeded = budget.totalSpent > budget.limit;
    res.status(200).json({
      limit: budget.limit,
      totalSpent: budget.totalSpent,
      exceeded: isExceeded,
      message: "budget exceeded",
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};
