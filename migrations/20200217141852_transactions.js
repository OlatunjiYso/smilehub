exports.up = function (knex) {
  return knex.schema
    .createTable('transactions', function (table) {
      table.increments('transaction_id');
      table.integer('user_id');
      table.integer('amount');
      table.string('type')
      table.integer('starting_balance');
      table.integer('closing_balance');
      table.datetime('time_created_at').defaultTo(knex.fn.now());
      table.foreign('user_id').references('users.user_id');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('transactions')
};