import express from 'express';
import AccountController from '../controllers/account.controller';

const accountController = new AccountController();

const router = express.Router();

router.post('/accounts', accountController.createAccount);
// router.post('/signin', accountController.loginUser);

export default router;
