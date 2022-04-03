const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/customer.controller');

router.route('/')
    .get(customerController.getAll)
    .post(customerController.create);

module.exports = router;