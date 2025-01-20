import { Router } from 'express';
import {
  addTransaction,
  getTransactions,
  generateReport,
  setBudget,
  getBudgetStatus,
  summaryData,
} from '../controllers/transactionController';

const router = Router();

router.post('/transactions', addTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/report', generateReport);
router.post('/budget', setBudget);
router.get('/budget/status',  getBudgetStatus);
router.get('/transactions/summary', summaryData);

export default router;
