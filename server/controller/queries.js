const knex = require('../db/knex');

const getQueryById = async (id) => {
    try {
        const query = await knex
            .select()
            .from('queries')
            .where('id', id)
            .then((query) => {
                return query[0];
            });

        return query;
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Route: [api/queries/read]
const readQueries = async (req, res) => {
    try {
        const queries = await knex.select().from('queries');
        res.send(queries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const runById = async (req, res) => {
    if (!req.query.id) return res.status(400).send('No query id provided.');

    try {
        const sql = await getQueryById(req.query.id);

        const query = await knex.raw(sql.query);

        res.send(query);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const runRawQuery = async (req, res) => {
    try {
        const query = await knex.raw(req.body.query);

        res.send(query);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    readQueries,
    runById,
    runRawQuery,
    // getQueryById,
    // addQuery,
    // updateQuery,
    // removeQuery,
};
