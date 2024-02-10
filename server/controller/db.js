const readDir = require('../utils/directoryRead');
const path = require('path');

async function availableDatabases(req, res) {
    try {
        res.send({
            dbs: await readDir('../db/databases'),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

async function allTables(req, res) {
    const dbDIR = path.join(__dirname, '../db/');
    console.log('dbDIR: ', dbDIR);

    if (req.query.db) {
        console.log('req.query.db: ', req.query.db);
    } else {
        console.log('no req.query.db');
        return res.status(400).send('No database provided.');
    }

    const knex = await require('knex')({
        client: 'sqlite3',
        connection: {
            filename: `${dbDIR}${req.query.db}.sqlite3`,
        },
        useNullAsDefault: true,
    });

    const counts = {};
    const tables = await knex.raw(
        'SELECT * FROM sqlite_master WHERE type="table" AND name != "sqlite_sequence"'
    );

    console.log('tables: ', tables);

    Promise.all(
        await tables.map(async (table) => {
            return await knex(table.name)
                .count('*')
                .first()
                .then((count) => {
                    counts[table.name] = count['count(*)'];
                    return counts;
                })
                .then((counts) => {
                    return counts;
                });
        })
    )
        .then((counts) => {
            res.json({
                tables,
                counts: counts[0], // TODO: determine why this is an array of objects, not just an object
            });
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json({
                error: true,
                message: `There was an error running allTables query: ${err}`,
            });
        });
}

module.exports = {
    availableDatabases,
    allTables,
};
