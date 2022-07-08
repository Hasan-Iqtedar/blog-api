const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.createUser = [
  body('username', 'Username must be provided')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must be provided')
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
    //Check if a user already exists. Since we have only one user.
    User.countDocuments(function (err, count) {
      if (err) {
        return next(err);
      }
      if (count > 0) {
        res.json({
          message: 'User exists',
        });
      } else {
        //Create a user. Encrypt too.
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return next(err);
          } else {
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            });

            user.save(function (err) {
              if (err) {
                return next(err);
              }
              res.json({
                message: 'User created',
              });
            });
          }
        });
      }
    });
  },
];

exports.loginUser = [
  body('username').trim().escape(),
  body('password').trim().escape(),
  (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Authentication Err. Something is not right.',
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.send(err);
        }
        //If user is coming from mongoose use user.toJSON.
        //Else use JSON.stringify(user).
        //The object to generate token should be a json object.
        const token = jwt.sign(user.toJSON(), 'secret-key');
        return res.json({ user: token });
      });
    })(req, res);
  },
];
