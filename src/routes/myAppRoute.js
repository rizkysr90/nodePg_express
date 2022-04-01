const express = require('express');
const authRouter = require('./auth/auth.route');
const router = express.Router();

router.use('/admin',authRouter);
// Auth Middleware
router.use((req,res,next) => {
    const user = 'admin'
    const password = 'admin123'
    // Do Query
    // SELECT * FROM admin WHERE id = {user} AND password = {password}
    // If Found
    // req.authenticate = true;
    // else 
    // let err = new Error('User not found');
    // let err.statusCode = 403
    // throw err

})