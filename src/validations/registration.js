import validator from 'validator';

import generalValidations from '../validations/general';

/**
 * @description contains validation for adding a new user
 */
class Registration {

  static validateRegistration(req, res, next) {
    let { firstname, lastname, email, password, phone } = req.body;
    let errors = [];
    if (!phone) {
      errors.push('phone number is required')
    }
    if (phone && (validator.isEmpty(phone) || !validator.isMobilePhone(phone, 'en-NG'))) {
      errors.push('please provide a valid phone number')
    }
    if (!firstname) {
      errors.push('firstname is required')
    }
    if ( firstname && (validator.isEmpty(firstname) || !validator.isAlpha(firstname)) ) {
      errors.push('please enter a valid firstname')
    }
    if (!lastname) {
      errors.push('lastname is required')
    }
    if ( lastname && (validator.isEmpty(lastname) || !validator.isAlpha(lastname))) {
      errors.push('please enter a valid last name')
    }
    generalValidations.validateEmail(errors, email);
    generalValidations.validatePassword(errors, password);

    if(errors.length > 0) {
      return res.status(400)
      .json({
        success: false,
        errors
      })
    }
    next()
  }
}

export default Registration;