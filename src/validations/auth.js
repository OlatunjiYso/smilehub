
import generalValidations from './general';

class AuthValidations {

  static validateLogin(req, res, next) {
    const { email, password } = req.body;
    let errors = [];
    generalValidations.validateEmail(errors, email);
    if(!password) { errors.push('password is required') }
    if(errors.length > 0 ){
      return res.status(400)
      .json({
        success: false,
        errors
      })
    }
    next();
  }
}




export default AuthValidations;