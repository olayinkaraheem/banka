import express from 'express';
import UserController from '../controllers/users.controller';

const userController = new UserController();

const router = express.Router();

router.post('/signup', userController.signupUser);
router.post('/signin', userController.loginUser);

export default router;
