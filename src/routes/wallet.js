import express    from 'express';

import validations from '../validations/wallet';
import controller from '../controllers/wallet';
import authenticate from '../middlewares/authorization';

const walletHandler = express.Router();

authenticate;

walletHandler.post(
  '/transact',
  validations.validateEmail,
  validations.validateTransaction,
  controller.transact
);

walletHandler.get(
  '/balance',
  validations.validateEmail,
  controller.getBalance
)


export default walletHandler;
