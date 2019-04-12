import express from 'express';
import AccountController from '../controllers/account.controller';

const accountController = new AccountController();

const router = express.Router();

router.post('/accounts', accountController.createAccount);
router.patch('/account/:accountNumber', accountController.updateAccountStatus);

export default router;
