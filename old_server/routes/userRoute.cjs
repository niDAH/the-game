const express = require('express');
const userRoutes = require('./../controllers/userController');
const router = express.Router();

router.post('/login', userRoutes.userLogin);

// router.post('/create', userRoutes.userCreate);
// router.get('/read/:userId', userRoutes.userRead);
// router.get('/all', userRoutes.usersAll);
// router.post('/update', userRoutes.userUpdate);
// router.put('/delete', userRoutes.userDelete);


module.exports = router;
