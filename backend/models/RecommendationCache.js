// models/RecommendationCache.js
const mongoose = require('mongoose');

const recommendationCacheSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  recommendations: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  profileVersion: {  // Tracks medical profile version
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('RecommendationCache', recommendationCacheSchema);