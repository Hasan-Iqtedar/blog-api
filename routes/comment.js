const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/commentController');

//Get all comments of a post.
router.get('/', commentController.getAllCommentsOfPost);

//Create a comment for a post.
router.post('/', commentController.createComment);

module.exports = router;
