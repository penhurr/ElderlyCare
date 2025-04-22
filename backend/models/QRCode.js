const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    data: { type: String, required: true },
    
}, { timestamps: true });

module.exports = mongoose.model('QRCode', qrCodeSchema);