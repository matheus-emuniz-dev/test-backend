import { Router } from 'express';
import signin from './signin.js';
import signup from './signup.js';

const authenticationRouter = Router();

authenticationRouter.use('/signin', signin);
authenticationRouter.use('/signup', signup);

export default authenticationRouter;
