const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order/order.controller');

router.route('/')
    .get(orderController.getAll)
    .post(orderController.create)
    
    

module.exports = router;