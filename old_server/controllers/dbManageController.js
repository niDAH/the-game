const knex = require('./../db');

// async function runQuery(query, res) {
//     Promise.resolve()
//         .then(() => knex.raw(query))
//         .then((results) => {
//             res.json({ results });
//         })
//         .catch((err) => {
//             console.log('err: ', err);
//             res.json({ message: `There was an error running query: ${err}` });
//         });
// }

exports.dataTables = async(req, res) => {
    const { body } = req;
    const tableData = await knex.raw(`
        SELECT  *
        FROM    sqlite_master
        WHERE   type="table"
                AND name != "${body.tableName}"
    `);

    console.log('tableData: ', tableData);
    // runQuery(tableData, res);
    res.json({ tableData });
};

exports.allTables = async({ res }) => {
    const counts = {};
    const tables = await knex.raw('SELECT * FROM sqlite_master WHERE type="table" AND name != "sqlite_sequence"');

    Promise.all(
        await tables.map(async(table) => {
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
                message: `There was an error running allTables query: ${err}`
            });
        });
};

exports.deleteTable = async(req, res) => {
    const { body } = req;

    Promise.resolve()
        .then(() => knex.schema.dropTableIfExists(body.tableName))
        .then(() => {
            res.json({ message: 'Table deleted successfully' });
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json({ message: `There was an error running deleteTable query: ${err}` });
        });
};

exports.queryAll = async({ res }) => {
    Promise.resolve()
        .then(() => knex('queries').select('*'))
        .then((results) => {
            res.json({ results });
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json({ message: `There was an error running query all: ${err}` });
        });
};

exports.queryRun = async(req, res) => {
    const { body } = req;

    Promise.resolve()
        .then(() => knex.raw(body.query))
        .then((results) => {
            knex
                .raw(`SELECT l.name FROM pragma_table_info("${body.tableName}") as l WHERE l.pk = 1;`)
                .then((pks) => {
                    res.json({ results, pks });
                });
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json({ message: `There was an error running query run: ${err}` });
        });
};

exports.querySave = async(req, res) => {
    const { body } = req;

    Promise.resolve()
        .then(() => knex('queries').insert(body))
        .then(() => {
            res.json({ message: 'Query saved successfully' });
        })
        .catch((err) => {
            console.log('err: ', err);
            res.json({ message: `There was an error running query save: ${err}` });
        });
};
