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
  createUser,
  loginUser,
  loadUser,
  logoutUser,
  updateUserInfo,
  updateUserPassword,
  findUserById,
  adminGetAllUsers,
  adminDeleteUser,
} from "../controllers/userController";
import {
  createCategory,
  deleteCategoryById,
  listCategories,
} from "../controllers/categoryController";
import { getBudgetStatus, setBudget } from "../controllers/budgetController";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.post("/transactions", isAuthenticated, addTransaction);
router.get("/transactions", isAuthenticated, getTransactions);
router.post("/transactions/update/:id", isAuthenticated, updateTransactionById);
router.post("/transactions/delete/:id", isAuthenticated, deleteTransactionById);
router.get("/transactions/report", isAuthenticated, generateReport);
router.post("/budget", isAuthenticated, setBudget);
router.get("/budget/status", isAuthenticated, getBudgetStatus);
router.get("/transactions/summary", isAuthenticated, summaryData);
router.get("/categories", isAuthenticated, listCategories);
router.post("/categories", isAuthenticated, createCategory);
router.post("/categories/delete/:id", isAuthenticated, deleteCategoryById);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, loadUser);
router.get("/logout", isAuthenticated, logoutUser);
router.put("/update", isAuthenticated, updateUserInfo);
router.put("/password/update", isAuthenticated, updateUserPassword);

export default router;
