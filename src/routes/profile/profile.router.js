const express = require('express');
const router = express.Router();
const profileController = require('./../../controllers/profile/profile.controller');

router.route('/')
    .get(profileController.getAll)
router.route('/:customer_account_id')
    .put(profileController.update)

module.exports = router;
