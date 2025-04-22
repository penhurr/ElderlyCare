const express = require('express');
const { createQRCode, getQRCode } = require('../controllers/qrController');

const authMiddleware = require('../middleware/authmiddleware'); // Your auth middleware

const router = express.Router();
router.get('/:userId',  getQRCode);

router.post('/',authMiddleware, createQRCode);

module.exports = router;