const express = require('express');
const router = express.Router();
const customerRouter = require('./customer/customer.router');
const authMiddleware = require('./../misc/auth/auth.middleware');

router.get('/',(req,res,next) => res.send('Hello World'));

router.use('/customer',[authMiddleware,customerRouter]);

module.exports = router;