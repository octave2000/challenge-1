import { Router } from "express";
import {
  addTransaction,
  getTransactions,
  generateReport,
  summaryData,
  updateTransactionById,
  deleteTransactionById,
} from "../controllers/transactionController";
import {
  createCategory,
  deleteCategoryById,
  listCategories,
} from "../controllers/categoryController";
import { getBudgetStatus, setBudget } from "../controllers/budgetController";

const router = Router();

router.post("/transactions", addTransaction);
router.get("/transactions", getTransactions);
router.post("/transactions/update/:id", updateTransactionById);
router.post("/transactions/delete/:id", deleteTransactionById);
router.get("/transactions/report", generateReport);
router.post("/budget", setBudget);
router.get("/budget/status", getBudgetStatus);
router.get("/transactions/summary", summaryData);
router.get("/categories", listCategories);
router.post("/categories", createCategory);
router.post("/categories/delete/:id", deleteCategoryById);

export default router;
