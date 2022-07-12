const passport = require('passport');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.getAllPosts = function (req, res, next) {
  Post.find({})
    .sort({ title: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    });
};

exports.getPublishedPosts = function (req, res, next) {
  Post.find({ published: 'true' })
    .sort({ title: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
};

exports.createPost = [
  passport.authenticate('jwt', { session: false }),
  body('title', 'Title must be provided').trim().isLength({ min: 1 }).escape(),
  body('content', 'Text must be provided').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Invalid input');
      err.status = 400;
      return next(err);
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    post.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ post: post._id });
    });
  },
];

exports.updatePost = [
  body('postId').escape(),
  body('title').escape(),
  body('content').escape(),
  body('published').escape(),
  body('publish_date').escape(),

  passport.authenticate('jwt', { session: false }),

  (req, res, next) => {
    const post = {
      _id: req.params.postId,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      publish_date: req.body.publish_date,
    };

    //If the post is being published.
    if (req.body.published === 'true') {
      post.publish_date = new Date();
    } else {
      post.publish_date = null;
    }

    Post.findByIdAndUpdate(
      req.params.postId,
      post,
      {},
      function (err, updatePost) {
        if (err) {
          return next(err);
        }
        return res.json({ post: post.title });
      }
    );
  },
];

exports.deletePost = [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId, function (err) {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Deletion Successful' });
    });
  },
];
