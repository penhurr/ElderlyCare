const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { createProfile, getMedicalProfile } = require('../controllers/medicalController');
const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/:userId', authMiddleware, getMedicalProfile);

module.exports = router;