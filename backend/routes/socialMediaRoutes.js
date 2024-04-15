const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');

router.get('/posts', socialMediaController.getUserPosts); // route for fetching user posts 
router.get('/followers', socialMediaController.getUserFollowers); // route for fetching user followers

// Add more routes as needed for fetching other social media data
module.exports = router;
