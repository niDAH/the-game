const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const queriesController = require('../controller/queries');

router.get('/', auth, queriesController.readQueries);

router.get('/read', auth, queriesController.readQueries); // [api/queries/read]

router.get('/runById', auth, queriesController.runById); // [api/queries/runById]

router.post('/runRaw', auth, queriesController.runRawQuery); // [api/queries/runRaw]

module.exports = router;
