// middleware/cacheMiddleware.js
const RecommendationCache = require('../models/RecommendationCache');

const checkRecommendationCache = async (req, res, next) => {
  try {
    const cached = await RecommendationCache.findOne({ userId: req.user.id });
    if (cached) {
      req.cachedRecommendations = cached.recommendations;
      req.cacheExists = true;
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = checkRecommendationCache;