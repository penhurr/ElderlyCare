const mongoose = require('mongoose');

const locationAlertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    location: { type: String, required: true },
    alertMessage: { type: String },
});

module.exports = mongoose.model('LocationAlert', locationAlertSchema);