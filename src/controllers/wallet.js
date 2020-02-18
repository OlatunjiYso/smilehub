import knex from '../knex';

import { usersTable, transactionsTable } from '../tables';


/**
 * @description - this class contains all methods for user wallet.
 */

class Wallet {

  /**
   * @description - this method credits or debit users wallet.
   * 
   * @param {object} req request object
   * @param {object} res response object
   */
  static async transact(req, res) {
    let { email, amount, type } = req.body;
    amount = parseInt(amount);
    try {
      let userId = await knex(usersTable).where({ email }).select('user_id');
      
      if (userId.length === 0) {
        return res.status(404)
          .json({
            msg: 'no user with specified email exists'
          })
      }

      userId = userId[0]['user_id'];
      let userTransactions = await knex(transactionsTable).where({ user_id: userId }).select('closing_balance');
      let previousTransactions = userTransactions.length;

      if (previousTransactions === 0) {
        if (type === 'debit') {
          return res.status(403)
            .json({
              msg: 'You have no transaction record yet'
            })
        }
        let startingBalance = 0;
        let closingBalance = amount;
        await knex(transactionsTable)
          .insert({
            user_id: userId,
            type,
            amount,
            starting_balance: startingBalance,
            closing_balance: closingBalance
          });
          return res.status(201)
          .json({
            msg: 'Transaction successful',
            type,
            amount,
            startingBalance,
            closingBalance
          })
      } else {
        let startingBalance = userTransactions[previousTransactions -1].closing_balance;
        let closingBalance = (type === 'credit') ? startingBalance + amount : startingBalance - amount;
        await knex(transactionsTable)
        .insert({
          user_id: userId,
          type,
          amount,
          starting_balance: startingBalance,
          closing_balance: closingBalance
        });
        return res.status(201)
          .json({
            msg: 'Transaction successful',
            amount,
            type,
            startingBalance,
            closingBalance
          })
      }
    }
    catch (err) {
      return res.status(500)
      .json({
        msg: 'internal server error',
        error: err.message
      })
    }
  }

  /**
   * @decsription this methods fetches the balance of a user.
   * 
   * @param {object} req request object
   * @param {object} res respponse object
   */
  static async getBalance(req, res) {
    let { email } = req.body;

    try {
      let userId = await knex(usersTable).where({ email }).select('user_id');
      
      if (userId.length === 0) {
        return res.status(404)
          .json({
            msg: 'no user with specified email exists'
          })
      }

      userId = userId[0].user_id;
      let userTransactions = await knex.select('*').from(transactionsTable).leftJoin(usersTable, `${transactionsTable}.user_id`, `${usersTable}.user_id`).where({ 'transactions.user_id': userId });
      let previousTransactions = userTransactions.length;

      if (previousTransactions === 0) {
        return res.status(200)
        .json({
          msg: 'User has no transaction record',
          transactions: previousTransactions,
          balance: 0
        })
      } else {
        let { email, firstname, lastname, closing_balance } = userTransactions[previousTransactions - 1];
        return res.status(200)
        .json({
          msg: 'User balance found',
          firstname,
          lastname,
          email,
          balance: closing_balance
        })
      }
    }
    catch(err) {
      return res.status(500)
      .json({
        msg: 'internal server error',
        error: err.message
      })
    }
  }


  /**
   * @description fetches users transaction history
   * 
   * @param {object} req request object
   * @param {object} res response object
   */ 
  static async getHistory(req, res) {
    let { email } = req.body;

    try {
      let userId = await knex(usersTable).where({ email }).select('user_id');
      
      if (userId.length === 0) {
        return res.status(404)
          .json({
            msg: 'no user with specified email exists'
          })
      }
      
      userId = userId[0].user_id;
      let userTransactions = await knex.select('*').from(transactionsTable).leftJoin(usersTable, `${transactionsTable}.user_id`, `${usersTable}.user_id`).where({ 'transactions.user_id': userId });
      let previousTransactions = userTransactions.length;

      if (previousTransactions === 0) {
        return res.status(200)
        .json({
          msg: 'User has no transaction record',
          transactions: previousTransactions
        })
      } else {
        let { email, firstname, lastname, closing_balance } = userTransactions[previousTransactions - 1];
        return res.status(200)
        .json({
          msg: 'User balance found',
          balance: closing_balance,
          firstname,
          lastname,
          email,
          userTransactions
        })
      }
    }
    catch(err) {
      return res.status(500)
      .json({
        msg: 'internal server error',
        error: err.message
      })
    }
  }
}


export default Wallet;