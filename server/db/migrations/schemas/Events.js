const eventsSchema = (table) => {
    table.increments('eventId').primary().unique();
    table.integer('boardId');
    table.string('eventType');
    table.string('eventText');
    table.integer('row');
    table.integer('col');
    table.integer('createdBy').notNullable().defaultTo(0);
    table.timestamps(true, true);
};

module.exports = eventsSchema;
