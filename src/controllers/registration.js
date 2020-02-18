import bcrypt    from 'bcryptjs';
import knex from '../knex';
import jwt from 'jsonwebtoken';

import { usersTable } from '../tables';


const jwtKey = process.env.JWT_SECRET_KEY

/**
 * @decsription class to house all user registration methods
 */

 class Registration {

  /**
 * @description adds a new user record to users table.
 * 
 * @param { object } req request object
 * @param { object } res response object
 */
static async registerUser(req, res) {
  let { firstname, lastname, email, phone, password } = req.body;

  try {
    let userRecord = await knex(usersTable).where({ email }).select('*');
    if (userRecord.length > 0) {
      return res.status(409)
      .json({
        msg: 'User with this email already exist'
      })
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let newRecord = await knex(usersTable)
    .returning('user_id')
    .insert({ email, firstname, lastname, phone, password: hashedPassword });

    const token = jwt.sign({ id: newRecord[0], email }, jwtKey);

    return res.status(201)
    .json({
      msg: 'new user created!',
      token
    })
  }
  catch(err) {
    return res.status(500)
    .json({
      error: err.message
    })
  }
}
 }

 export default Registration;

