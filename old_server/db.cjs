// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/the-game.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
});

knex.schema
    .hasTable('boards')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('boards', (table) => {
                table.increments('boardId').primary();
                table.integer('northEdgeBoardId');
                table.integer('eastEdgeBoardId');
                table.integer('southEdgeBoardId');
                table.integer('westEdgeBoardId');
                table.string('title');
                table.string('boardType');
                table.string('boardData');
                table.integer('defaultBoard');
            })
                .then(() => {
                    // Log success message
                    console.info('Table \'boards\' created');
                })
                .catch((error) => {
                    console.error(`There was an error creating boards: ${error}`);
                });
        }
    })
    .then(() => {
        // Log success message
        console.info('DB done.');
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`);
    });

knex.schema
    .hasTable('events')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('events', (table) => {
                table.increments('eventId').primary();
                table.integer('boardId');
                table.string('eventType');
                table.string('eventText');
                table.integer('row');
                table.integer('col');
            })
                .then(() => {
                    // Log success message
                    console.info('Table \'events\' created');
                })
                .catch((error) => {
                    console.error(`There was an error creating events: ${error}`);
                });
        }
    });

knex.schema
    .hasTable('users')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('userId').primary();
                table.string('email');
                table.string('firstName');
                table.string('lastName');
                table.string('password');
            })
                .then(() => {
                    // Log success message
                    console.info('Table \'users\' created');
                })
                .catch((error) => {
                    console.error(`There was an error creating user: ${error}`);
                });
        }
    });

// Just for debugging purposes:
// Log all data in "boards" table
knex.select('*').from('boards')
    .then(data => console.log('data:', data))
    .catch(err => console.error(err));

knex.select('*').from('events')
    .then(data => console.log('data:', data))
    .catch(err => console.error(err));

// Export the database
module.exports = knex;
