exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('user_id');
      table.string('email', 255).notNullable();
      table.string('firstname', 255).notNullable();
      table.string('lastname', 255).notNullable();
      table.string('phone', 255).notNullable();
      table.string('password', 255).notNullable();
      table.datetime('account_created_at').defaultTo(knex.fn.now());
      table.datetime('account_updated_at');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('users')
};