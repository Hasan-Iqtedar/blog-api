const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

//Get all comments.
router.get('/', commentController.getAllComments);

//Get a particular comment.
router.get('/:commentId', commentController.getCommentById);

//Create a comment.
router.post('/', commentController.createComment);

//Update a comment.
router.put('/:commentId', commentController.updateComment);

//Delete a comment.
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
