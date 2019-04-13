import express from 'express';
import TransactionController from '../controllers/transactions.controller';

const transactionController = new TransactionController();

const router = express.Router();

router.post('/:accountNumber/debit', transactionController.performTransaction);
// router.post('/signin', userController.loginUser);

export default router;
