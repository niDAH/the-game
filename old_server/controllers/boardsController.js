import knex, { select, transaction, schema } from './../db';

const readBoard = async (res, whereClause) => {
    const db = select('*')
        .from('boards')
        .where(whereClause[0], whereClause[1])
        .then((boardData) => {
            if (boardData.length === 0) {
                res.json({ message: `There was no board with ${whereClause[0]}=${whereClause[1]}` });
                return;
            }

            res.json(boardData);
        })
        .catch((err) => {
            res.json({ message: `There was an error retrieving board with ${whereClause[0]}=${whereClause[1]}: ${err}` });
        });

    return db;
};

export async function boardsAll({ res }) {
    select('*')
        .from('boards')
        .then((boardsData) => res.json(boardsData))
        .catch(err => {
            // Send a error message in response
            res.json({ error: true, message: `There was an error retrieving boards: ${err}` });
        });
}

export async function boardCreate(req, res) {
    const {
        boardData,
        gridType,
        defaultGrid,
        title,
        northEdgeBoardId,
        eastEdgeBoardId,
        southEdgeBoardId,
        westEdgeBoardId,
    } = req.body;

    // Add new book to database
    knex('boards')
        .insert({
            boardData,
            gridType,
            defaultGrid: defaultGrid ? 1 : 0,
            title,
            northEdgeBoardId,
            eastEdgeBoardId,
            southEdgeBoardId,
            westEdgeBoardId,
        })
        .then(() => {
            res.json({ message: `Board '${title}' saved.` });
            console.log('done');
        })
        .catch(err => {
            res.json({ error: true, message: `There was an error creating '${title}' board: ${err}` });
        });
}

export async function boardReadDefault(req, res) {
    const whereClause = ['defaultGrid', true];

    const boardData = await readBoard(res, whereClause);

    return await boardData;
}

export async function boardRead(req, res) {
    const gridId = req.params.gridId;
    const whereClause = ['gridId', gridId];

    return await readBoard(res, whereClause);
}

export async function boardDelete(req, res) {
    const { gridId } = req.body;

    knex('boards')
        .where('gridId', gridId) // find correct record based on id
        .del() // delete the record
        .then(() => {
            res.json({ message: `Board ${gridId} deleted.` });
        })
        .catch(err => {
            res.json({ error: true, message: `There was an error deleting ${req.body.id} book: ${err}` });
        });
}

export async function boardsReset({ res }) {
    select('*')
        .from('boards')
        .truncate()
        .then(() => {
            res.json({ message: 'Boards cleared.' });
        })
        .catch(err => {
            res.json({ error: true, message: `There was an error truncating the boards table: ${err}.` });
        });
}

export async function boardUpdate(req, res) {
    const {
        gridId,
        boardData,
        gridType,
        defaultGrid,
        title,
        northEdgeBoardId,
        eastEdgeBoardId,
        southEdgeBoardId,
        westEdgeBoardId,
    } = req.body;

    knex('boards')
        .where('gridId', gridId)
        .update({
            boardData,
            gridType,
            defaultGrid: defaultGrid ? 1 : 0,
            title,
            northEdgeBoardId,
            eastEdgeBoardId,
            southEdgeBoardId,
            westEdgeBoardId,
        })
        .then(() => {
            res.json({ message: `Board '${title}' updated.` });
        })
        .catch(err => {
            res.json({ error: true, message: `There was an error updating '${title}' board: ${err}` });
        });
}

export async function boardUpdateBorder(req, res) {
    const {
        gridId,
        edgeName,
        edgeBoardId,
    } = req.body;

    let otherEdgeName;

    // TODO: is this really the way to do this? it should at least be a switch statement
    if (edgeName === 'northEdgeBoardId') {
        otherEdgeName = 'southEdgeBoardId';
    } else if (edgeName === 'eastEdgeBoardId') {
        otherEdgeName = 'westEdgeBoardId';
    } else if (edgeName === 'southEdgeBoardId') {
        otherEdgeName = 'northEdgeBoardId';
    } else if (edgeName === 'westEdgeBoardId') {
        otherEdgeName = 'eastEdgeBoardId';
    }

    transaction((trx) => {
        return trx('boards')
            .where('gridId', gridId)
            .update({
                [edgeName]: edgeBoardId,
            })
            .then(() => {
                return trx('boards')
                    .where('gridId', edgeBoardId)
                    .update({
                        [otherEdgeName]: gridId,
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err => {
                res.json({ error: true, message: `There was an error updating board border: ${err}` });
            });
    });
}

export async function tableReset() {
    schema
        .hasTable('boards')
        .then((exists) => {
            if (!exists) {
                return schema.createTable('boards', (table) => {
                    table.increments('gridId').primary();
                    table.string('cellArray');
                    table.string('gridType');
                    table.integer('defaultGrid');
                    table.integer('eastEdgeBoardId');
                    table.integer('northEdgeBoardId');
                    table.integer('southEdgeBoardId');
                    table.integer('westEdgeBoardId');
                    table.string('title');
                })
                    .then(() => {
                        // Log success message
                        console.info('Table \'boards\' created');
                    })
                    .catch((error) => {
                        console.error(`There was an error creating table: ${error}`);
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
}
