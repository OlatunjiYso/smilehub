import validator from 'validator';

class GeneralValidations {


  /**
   * @description - an helper method to validate text inputs
   * @param {string} text - text to be checked
   */
  static validTextInput(text) {
    let isValid = true;
    if(!text) {
      isValid = false;
    }
    if (text && (validator.isNumeric(text) || text.trim().length < 2)) {
      isValid = false
    }
    return isValid;
  }

  /**
   * @description - method to check if email is valid or not.
   * @param {array} errors  - array to contain all validation errors
   * @param {string} email - email to be checked.
   */
  static validateEmail(errors, email) {
    if(!email) {
      errors.push('email is required')
    }
    if(email && !validator.isEmail(email)) {
      errors.push('Email is invalid')
    }
  }

   /**
   * @description - method to check if password is valid or not.
   * @param {array} errors  - array to contain all validation errors
   * @param {string} password - password to be checked.
   */
  static validatePassword(errors, password) {
    if(!password) {
      errors.push('Password is required')
    }
    if (password && password.length < 6) {
      errors.push('Password must be a minimum of 6 characters');
    }
  }
}


export default GeneralValidations;