const knex = require('./../db');

exports.boardCreate = async (req, res) => {
    const {
        gridId,
        name,
        text,
        type,
        row,
        col,
    } = req.body;

    // Add new book to database
    knex('events')
        .insert({
            gridId,
            name,
            text,
            type,
            row,
            col,
        })
        .then(() => {
            res.json({ message: `Event '${name}' saved.` });
            console.log('done');
        })
        .catch(err => {
            res.json({ error: true, message: `There was an error creating '${name}' board: ${err}` });
        });
};
