const verifyToken = require('../middlewares/verifytoken');
const express = require('express');
const router = express.Router(); // for configuring requests from frontend (to which end point the request want to go)
const authController = require('../controllers/authController'); // controller functions
// router.use(verifyToken);
router.post('/register', authController.register); // route for user registration
router.post('/login', authController.login); // route for user login
router.get('/user_data', verifyToken, authController.get_user_data);
module.exports = router;