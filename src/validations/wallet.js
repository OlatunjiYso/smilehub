import validator from 'validator';

import generalValidations from './general';

/**
 * @description contains all methods validating transactions
 */
class Wallet {

  /**
   * @description ensures that a valid transaction is done
   * @param {obj} req request object
   * @param {obj} res response object
   * @param {func} next next function in pipeline
   */
  static validateTransaction(req, res, next) {
    const { amount, type } = req.body;
    let errors = [];
    if (!amount) { errors.push('amount is required') }
    if (amount && (validator.isEmpty(amount) || !validator.isInt(amount, { min: 100, max: 100000000 }))) {
      errors.push('please enter a valid amount')
    }
    if (!type) { errors.push('type is required') }
    if (type && (validator.isEmpty(type) || !validator.isIn(type, ['debit', 'credit']))) {
      errors.push('please enter a valid transaction type')
    }
    if (errors.length > 0) {
      return res.status(400)
        .json({
          success: false,
          errors
        })
    }
    next();
  }

  /**
   * @description ensures that a valid user email is being referenced.
   */
  static validateEmail(req, res, next) {
    const { email } = req.body;
    let errors = [];
    generalValidations.validateEmail(errors, email);
    if (errors.length > 0) {
      return res.status(400)
        .json({
          success: false,
          errors
        })
    }
    next();
  }

}




export default Wallet;