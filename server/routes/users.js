const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const usersController = require('../controller/users');

router.get('/', auth, usersController.getUsersAuth); // Gets all users public  data if user's signed in

// router.get('/admin', auth, usersController.getUsersAdmin); // Gets all users private data only if admin [api/users/admin]

// router.get('/whoami', auth, usersController.getUserData); // Get's loggedin users data [api/users/whoami]

router.post('/login', usersController.login); // Logs in and returns access token and users ID [api/users/login]
router.get('/profile', usersController.profile); // Register user [api/users/profile]
router.post('/register', usersController.addUser); // Register user [api/users/register]

// router.put('/update', auth, usersController.updateUser); // Updates users data if user's signed in [api/users/update]
// router.delete('/delete', auth, usersController.removeUser); // Deletes user thats signed in

module.exports = router;
