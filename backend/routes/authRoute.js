'use strict';
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login } = require('../controllers/authController');

router.post(
    '/login',
    body('email').isEmail(),
    body('password').isString(),
    login
);

module.exports = router;