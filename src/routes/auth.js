import express    from 'express';

import validations from '../validations/auth';
import controller from '../controllers/authentication';

const authHandler = express.Router();

authHandler.post(
  '/',
  validations.validateLogin,
  controller.login
)


export default authHandler;
