const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customer/customer.controller');

router.route('/')
    .get(customerController.getAll)
    .post(customerController.create);
router.route('/:customer_id')
    .put(customerController.update)
    .get(customerController.getById)
    .delete(customerController.remove);
module.exports = router;