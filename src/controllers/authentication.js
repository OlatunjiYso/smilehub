import knex from '../knex';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { usersTable } from '../tables';
const jwtKey = process.env.JWT_SECRET_KEY

/**
 * @description - class that contains all methods for authenticating
 */

 class Authentication {

  /**
   * @description - method to log registered users in.
   * 
   * @param {object} req - request object
   * @param {object} res - response object
   */

   static async login (req, res) {
    let { email, password } = req.body;

    try {
      let userRecord = await knex.select('*').from(usersTable).where('email', email);

      if (userRecord.length > 0) {
        let user = userRecord[0];
        let hashedPassword = user.password;
        let passwordIsValid = bcrypt.compareSync(password, hashedPassword);
        if (passwordIsValid) {
          const token = jwt.sign({ id: user.user_id, email: user.email  }, jwtKey);
          return res.status(200)
            .json({
              msg: 'you are logged in!',
              token
            })
        } else {
          return res.status(403)
          .json({
            msg: 'invalid email or password'
          })
        }
      } else {
        return res.status(404)
        .json({
          msg: 'user with specified email do not exist'
        })
      }
    }
    catch(err) {
      return res.status(500)
      .json({
        msg: 'intenal server err',
        error: err.message
      })
    }
   }
 }

 export default Authentication;