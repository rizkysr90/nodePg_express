const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order/order.controller');

router.route('/')
    .get(orderController.getAll)
    .post(orderController.create)
router.route('/:order_id')
    .put(orderController.update)
    .get(orderController.getById)
    .delete(orderController.remove);
    
    

module.exports = router;