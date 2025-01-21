import type { Request, Response } from "express";
import Transaction from "../models/transaction";
import Budget from "../models/Budget";
import Category from "../models/category";
import sendMail from "../utils/sendMail";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { name, type, amount, account, category, subcategory, budget_id } =
      req.body;

    const user = req.user;
    const user_id = user._id;
    let findCategory = await Category.findOne({
      name: subcategory ? subcategory : category,
    });

    if (!findCategory) {
      let newCategory;
      if (subcategory) {
        let parent = await Category.findOne({ name: category });
        if (!parent) {
          const newParent = new Category({
            name: category,
          });
          parent = await newParent.save();
        }
        newCategory = new Category({
          name: subcategory,
          parentId: parent._id,
        });
      } else {
        newCategory = new Category({
          name: category,
        });
      }

      findCategory = await newCategory.save();
    }

    const transaction = new Transaction({
      name,
      type,
      amount,
      user_id,
      account,
      category: subcategory ? findCategory.parentId : findCategory._id, // Ensure proper reference
      subcategory: findCategory._id,
      budget_id,
    });

    const savedTransaction = await transaction.save();

    if (type === "expense") {
      const budget = await Budget.findById(budget_id);
      if (budget) {
        budget.totalSpent += amount;
        await budget.save();

        if (budget?.totalSpent > budget?.limit) {
          res.status(201).json({
            ...savedTransaction.toObject(),
            exceeded: true,
            message: "budget exceeded",
          });
        }
      }
    }

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const updateTransactionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { type, amount, account, category, subcategory, budget_id } =
      req.body;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const originalAmount = transaction.amount;
    const originalType = transaction.type;

    transaction.type = type ?? transaction.type;
    transaction.amount = amount ?? transaction.amount;
    transaction.account = account ?? transaction.account;
    transaction.category = category ?? transaction.category;
    transaction.subcategory = subcategory ?? transaction.subcategory;

    await transaction.save();

    if (originalType === "expense" && type === "expense") {
      const budget = await Budget.findById(budget_id);
      if (budget) {
        budget.totalSpent -= originalAmount;
        budget.totalSpent += amount;
        await budget.save();
      }
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const deleteTransactionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (transaction.type === "expense") {
      const budget = await Budget.findById(transaction.budget_id);
      if (budget) {
        budget.totalSpent -= transaction.amount;
        await budget.save();
      }
    }

    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const transactions = await Transaction.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};

export const summaryData = async (req: Request, res: Response) => {
  try {
    const groupBy = (req.query.groupBy as string) || "category";
    const filterKey = req.query.filterKey as string;
    const filterValue = req.query.filterValue as string;

    const groupFields: Record<string, any> = {
      category: { category: "$category" },
      subcategory: { subcategory: "$subcategory" },
      account: { account: "$account" },
      type: { type: "$type" },
      categoryAccount: { category: "$category", account: "$account" },
      subcategoryAccount: { subcategory: "$subcategory", account: "$account" },
    };

    const groupingField = groupFields[groupBy] || groupFields.category;

    const aggregationPipeline = [];

    if (filterKey && filterValue) {
      aggregationPipeline.push({
        $match: { [filterKey]: filterValue },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: groupingField,
        totalAmount: { $sum: "$amount" },
      },
    });

    const summary = await Transaction.aggregate(aggregationPipeline);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
};
