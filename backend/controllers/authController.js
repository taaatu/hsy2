'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('local params', err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) {
      next(httpError('email / password incorrect', 401));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('login error', 400));
        return;
      }
    });

    const token = jwt.sign(user, process.env.JWT_SECRET);
    return res.json({ user: user, token: token });
  })(req, res, next);
};

module.exports = { login };
