import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import getUserService from './get.js';

const userRouter = Router();

userRouter.use('/:userId', authMiddleware);

userRouter.get('/:userId', getUserService);

export default userRouter;
