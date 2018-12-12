function buildUserTable(knexOrTrx) {
  return knexOrTrx.schema.createTable('users', function(table) {
    table.uuid('id').primary();
    table.string('name').unique();
  });
}

function buildGroupTable(knexOrTrx) {
  return knexOrTrx.schema.createTable('groups', function(table) {
    table.uuid('id').primary();
    table.string('name').unique();
  });
}

function buildOrdersTable(knexOrTrx) {
  return knexOrTrx.schema.createTable('orders', function(table) {
    table.uuid('id').primary();
    table
      .string('userId', 2)
      .notNullable()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

function buildUserGroupJoinTable(knexOrTrx) {
  return knexOrTrx.schema.createTable('groups_users', function(table) {
    table
      .uuid('user')
      .references('id')
      .inTable('users')
      .withKeyName(['fk', 'groups_users', 'users'].join('-'));
    table.uuid('group');
    table.primary(['user', 'group']);
    table
      .foreign('group', ['fk', 'groups_users', 'groups'].join('-'))
      .references('id')
      .inTable('groups');
  });
}

module.exports = {
  buildGroupTable,
  buildOrdersTable,
  buildUserTable,
  buildUserGroupJoinTable,
};
