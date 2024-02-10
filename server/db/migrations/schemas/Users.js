const userSchema = (table) => {
    table.increments('id').primary().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').unique().notNullable();
    table.string('role').notNullable().defaultTo('users');
    table.string('password').notNullable();

    table.timestamps(true, true);
};

module.exports = userSchema;
