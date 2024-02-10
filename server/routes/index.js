const express = require('express');
const router = express.Router();

router.use('/db', require('./db'));
router.use('/queries', require('./queries'));
router.use('/users', require('./users'));

router.get('/test', async (req, res) => {
    res.send('Test');
});

router.get('/', (req, res) => {
    res.send('Welcome! Sorry this is a private API.');
});

module.exports = router;
