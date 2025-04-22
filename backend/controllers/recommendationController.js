require('dotenv').config();
const axios = require('axios');
const OpenAI = require('openai');

const RecommendationCache = require('../models/RecommendationCache');
const token = process.env.AI_API_KEY;

// const cacheRecommendations = async (userId, recommendations) => {
//     return await RecommendationCache.findOneAndUpdate(
//       { userId },
//       { 
//         recommendations,
//         lastUpdated: Date.now(),
//         $inc: { profileVersion: 1 }
//       },
//       { upsert: true, new: true }
//     );
//   };
  
//   const getCachedRecommendations = async (userId) => {
//     return await RecommendationCache.findOne({ userId });
//   };

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
});



const generateHealthRecommendations = async (profile) => {
    try {
        const prompt = `As a medical expert, provide personalized health recommendations for a person with:
      - Name: ${profile.name}
      - Medical history: ${profile.medicalHistory || 'Not specified'}
      - Allergies: ${profile.allergies || 'None reported'}
      - Current medications: ${profile.medications || 'None reported'}
      
      Provide specific recommendations in this format:
      1. Diet: [3-5 specific suggestions]
      2. Exercise: [3-5 specific suggestions]
      3. General Health Tips: [3-5 suggestions]
      
      Keep the recommendations practical, age-appropriate, and consider any mentioned conditions. also address the user(Name) as you`;

        

        const response = await client.chat.completions.create({
            messages: [
                
                { role: "user", content: prompt }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating health recommendations:', error);
        throw error;
    }
};

const generateFirstAidRecommendations = async (profile) => {
    try {
        const prompt = `As a medical expert, provide emergency first aid instructions for caregivers or any general person that happens to find the person with:
      - Name: ${profile.name}
      - Medical history: ${profile.medicalHistory || 'Not specified'}
      - Allergies: ${profile.allergies || 'None reported'}
      - Current medications: ${profile.medications || 'None reported'}
      
      
        Provide:
      - Immediate steps
      - What to monitor
      - When to seek emergency help
      
      Format the response in clear, easy to understand, short, straight to point, numbered steps.`;

        
        const response = await client.chat.completions.create({
            messages: [

                { role: "user", content: prompt }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating first aid recommendations:', error);
        throw error;
    }
};

module.exports = {
    generateHealthRecommendations,
    generateFirstAidRecommendations
    
};