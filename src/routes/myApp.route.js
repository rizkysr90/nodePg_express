const express = require('express');
const configAdmin = require('./../config/admin/admin.config');
const customerRouter = require('./customer/customer.router');
const authValidator = require('../validators/auth/auth.validator');
const router = express.Router();

router.get('/',(req,res,next) => res.send('Hello World'));
// Auth Middleware
router.use((req,res,next) => {
    const login = {
        username : 'admin',
        password : 'asdasdas'
    }
    if(authValidator.login(login,configAdmin)) {
        req.authenticated = true;
    } 
    // let err = new Error('Failed to authenticate - User not found');
    // err.statusCode = 403;
    // throw err;
    next();
});
router.use('/customer',customerRouter);

module.exports = router;