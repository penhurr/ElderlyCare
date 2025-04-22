const LocationAlert = require('../models/LocationAlert');

exports.createLocationAlert = async (req, res) => {
    const { userId, location, alertMessage } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const alert = new LocationAlert({ userId, location, alertMessage });
    await alert.save();

    // Send alert to caretakers (e.g., via Twilio API)
    const caretakers = await User.find({ role: 'caretaker' });
    caretakers.forEach(caretaker => {
        // Send SMS or email alert
    });

    res.status(201).json(alert);
};

exports.getLocationAlerts = async (req, res) => {
    const alerts = await LocationAlert.find();
    res.json(alerts);
};