const queriesSchema = (table) => {
    table.increments('id').primary().unique();
    table.string('name').notNullable();
    table.string('query').notNullable();
    table.integer('createdBy').notNullable().defaultTo(0);
    table.timestamps(true, true);
};

module.exports = queriesSchema;
