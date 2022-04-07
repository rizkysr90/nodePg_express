const express = require('express');
const router = express.Router();
const productController = require('./../../controllers/product/product.controller');

router.route('/')
    .get(productController.getAll)
    .post(productController.create)
router.route('/:product_id')
    .get(productController.getById)
    .put(productController.update)
    .delete(productController.remove);

module.exports = router