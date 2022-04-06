const express = require('express');
const router = express.Router();
const customerRouter = require('./customer/customer.router');
const profileRouter = require('./profile/profile.router');
const orderRouter = require('./order/order.route');
const productRouter = require('./product/product.router');
const authMiddleware = require('./../misc/auth/auth.middleware');

router.get('/',(req,res,next) => res.send('Hello World'));

router.use('/customer',[authMiddleware,customerRouter]);
router.use('/profile',[authMiddleware,profileRouter]);
router.use('/order',[authMiddleware,orderRouter]);
router.use('/product',[authMiddleware,productRouter]);

module.exports = router;