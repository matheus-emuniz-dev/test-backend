import { Router } from 'express';
import authenticationRouter from './authentication/index.js';
import userRouter from './user/index.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authenticationRouter);

export default apiRouter;
