import express   from 'express';

import validations from '../validations/registration';
import controller from '../controllers/registration';

const registrationHandler = express.Router();


registrationHandler.post(
  '/',
  validations.validateRegistration,
  controller.registerUser
);



export default registrationHandler;
