const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

//Get all posts.
router.get('/', postController.getAllPosts);

//Get published posts.
router.get('/published', postController.getPublishedPosts);

//Create a post.
router.post('/', postController.createPost);

//Update a post.
router.put('/:postId', postController.updatePost);

//Delete a post.
router.delete('/:postId', postController.deletePost);

module.exports = router;
