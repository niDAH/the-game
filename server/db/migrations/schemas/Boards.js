const boardsSchema = (table) => {
    table.increments('boardId').primary().unique();
    table.integer('northEdgeBoardId');
    table.integer('eastEdgeBoardId');
    table.integer('southEdgeBoardId');
    table.integer('westEdgeBoardId');
    table.string('title');
    table.string('boardType');
    table.string('boardData');
    table.integer('defaultBoard');
    table.integer('createdBy').notNullable().defaultTo(0);
    table.timestamps(true, true);
};

module.exports = boardsSchema;
