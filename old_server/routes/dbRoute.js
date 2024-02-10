const express = require('express');
const dbRoutes = require('./../controllers/dbManageController');
const router = express.Router();

router.get('/tables/all', dbRoutes.allTables);

router.get('/tables/data', dbRoutes.dataTables);

// router.post('/tables/create', dbRoutes.createTable);

// router.post('/tables/drop', dbRoutes.dropTable);

// router.post('/tables/insert', dbRoutes.insertIntoTable);

// router.post('/tables/update', dbRoutes.updateTable);

router.post('/tables/delete', dbRoutes.deleteTable);

// router.post('/tables/select', dbRoutes.selectFromTable);

router.get('/query/all', dbRoutes.queryAll);

router.post('/query/save', dbRoutes.querySave);

router.post('/query/run', dbRoutes.queryRun);

module.exports = router;
