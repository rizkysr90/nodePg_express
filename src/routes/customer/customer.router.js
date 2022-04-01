const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/customer.controller');

router.route('/')
    .get(customerController.getAll);

module.exports = router;