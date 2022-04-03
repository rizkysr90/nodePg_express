const express = require('express');
const router = express.Router();
const authValidator = require('./../../validators/auth/auth.validator');
const configAdmin = require('./../../config/admin/admin.config.json');

router.use((req,res,next) => {
    const {username,password} = req.headers;

    if(authValidator.login({username,password},configAdmin)) {
        next();
    } else {
        let err = new Error('Failed to authenticate - User not found');
        err.statusCode = 403;
        throw err;
    }
});

module.exports = router;