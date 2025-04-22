const express = require('express');
const { createLocationAlert, getLocationAlerts } = require('../controllers/locationController');
const router = express.Router();

router.post('/', createLocationAlert);
router.get('/', getLocationAlerts);

module.exports = router;