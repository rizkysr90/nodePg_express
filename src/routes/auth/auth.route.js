const express = require('express');
const router = express.Router();
const authController = require('./../../controllers/auth/auth.controller');
router.route('/')
    .post(authController.login);