const { body, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;
const Comment = require('../models/comment');

exports.getAllCommentsOfPost = function (req, res, next) {
  Comment.find({ post: new ObjectId(req.params.postId) })
    .sort({ date: 1 })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    });
};

exports.createComment = [
  body('author_name', 'Author name must be provided')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text name must be provided')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('post', 'Post Id name must be provided')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error('Invalid input');
      err.status = 400;
      return next(err);
    }

    const comment = new Comment({
      author_name: req.body.author_name,
      text: req.body.text,
      post: req.body.post,
    });

    comment.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ comment });
    });
  },
];
