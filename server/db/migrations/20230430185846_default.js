/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('boards', require('./schemas/Boards'))
        .createTable('events', require('./schemas/Events'))
        .createTable('users', require('./schemas/Users'));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex
        .schema
        .dropTable('boards')
        .dropTable('events')
        .dropTable('users');
};
