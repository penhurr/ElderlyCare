const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    recommendations: { type: String, required: true },
});

module.exports = mongoose.model('ExerciseDietRecommendation', recommendationSchema);