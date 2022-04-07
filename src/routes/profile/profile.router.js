const express = require('express');
const router = express.Router();
const profileController = require('./../../controllers/profile/profile.controller');

router.route('/')
    .get(profileController.getAll)
router.route('/:customer_account_id')
    .put(profileController.update)
    .get(profileController.getById)

module.exports = router;
