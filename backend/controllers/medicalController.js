const MedicalProfile = require('../models/MedicalProfile');

exports.createProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    try {
        // Convert string numbers to actual numbers
        const profileData = {
            userId: req.user.id,
            ...req.body,
            age: req.body.age ? Number(req.body.age) : undefined,
            height: req.body.height ? Number(req.body.height) : undefined,
            weight: req.body.weight ? Number(req.body.weight) : undefined
        };

        const profile = new MedicalProfile(profileData);
        await profile.save();
        
        res.status(201).json(profile);
    } catch (error) {
        console.error('Error creating medical profile:', error);
        res.status(500).json({ 
            message: 'Error creating medical profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getMedicalProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const medicalProfile = await MedicalProfile.findOne({ userId })
            .sort({ createdAt: -1 })
            .exec();

        if (!medicalProfile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }

        res.status(200).json(medicalProfile);
    } catch (error) {
        console.error('Error fetching medical profile:', error);
        res.status(500).json({ 
            message: 'Error fetching medical profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};