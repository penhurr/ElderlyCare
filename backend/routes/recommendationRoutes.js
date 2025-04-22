const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authmiddleware');
const MedicalProfile = require('../models/MedicalProfile');

// Health recommendations for dashboard
router.get('/health',authMiddleware, async (req, res) => {
  
  
  

  const  userId  = req.user.id;
  // console.log(userId);
  
  try {
    
    const profile = await MedicalProfile
    .findOne( {userId})
    .sort({ createdAt: -1 }) // Get the most recent profile
            .exec();;
    // console.log('User ID:', req.user._id);
    if (!profile) {
      return res.status(404).json({ error: 'Medical profile not found' });
    }
    
    const recommendations = await recommendationController.generateHealthRecommendations(profile);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// First aid recommendations for QR code access
router.get('/firstaid/:profileId', async (req, res) => {
  try {
    const profile = await MedicalProfile.findById(req.params.profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Medical profile not found' });
    }
    
    const recommendations = await recommendationController.generateFirstAidRecommendations(profile);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;