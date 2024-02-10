const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const dbController = require('../controller/db');

router.get('/all', auth, dbController.availableDatabases); // [api/db]
router.get('/tables', dbController.allTables); // [api/db/tables]')

module.exports = router;
