const express = require('express');
const eventRoutes = require('./../controllers/eventsController');
const router = express.Router();

router.post('/create', eventRoutes.boardCreate);
// router.get('/readDefault', eventRoutes.boardReadDefault);
// router.get('/read/:gridId', eventRoutes.boardRead);
// router.get('/all', eventRoutes.boardsAll);
// router.post('/update', eventRoutes.boardUpdate);
// router.post('/updateBorder', eventRoutes.boardUpdateBorder);
// router.put('/delete', eventRoutes.boardDelete);

// router.put('/reset', eventRoutes.boardsReset);

// router.put('/tableReset', eventRoutes.tableReset);

module.exports = router;
