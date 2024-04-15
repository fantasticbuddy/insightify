const verifyToken = require('../middlewares/verifytoken');
const express = require('express');
const router = express.Router(); // for configuring requests from frontend (to which end point the request want to go)
const authController = require('../controllers/authController'); // controller functions
// router.use(verifyToken);
router.post('/register', authController.register); // route for user registration
router.post('/login', verifyToken, authController.login); // route for user login

module.exports = router;