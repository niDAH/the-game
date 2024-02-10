const express = require('express');
const boardsRoutes = require('./../controllers/boardsController');
const router = express.Router();

router.post('/create', boardsRoutes.boardCreate);
router.get('/readDefault', boardsRoutes.boardReadDefault);
router.get('/read/:gridId', boardsRoutes.boardRead);
router.get('/all', boardsRoutes.boardsAll);
router.post('/update', boardsRoutes.boardUpdate);
router.post('/updateBorder', boardsRoutes.boardUpdateBorder);
router.put('/delete', boardsRoutes.boardDelete);

router.put('/reset', boardsRoutes.boardsReset);

router.put('/tableReset', boardsRoutes.tableReset);

module.exports = router;
