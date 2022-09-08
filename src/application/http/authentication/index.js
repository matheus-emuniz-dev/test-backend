import { Router } from 'express';
import signin from './signin/signin.js';
import signup from './signup/signup.js';

const authenticationRouter = Router();

authenticationRouter.post('/signin', signin);
authenticationRouter.post('/signup', signup);

export default authenticationRouter;
