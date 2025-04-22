import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recommendations/health`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecommendations(response.data.recommendations);
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to load recommendations. Please try again later.');
                setRecommendations("Diet:\n- Balanced meals: Include vegetables\n- Hydration: Drink 8 glasses daily\n\nExercise:\n- Daily Stretching: Improves flexibility\n- Cardio: 30 minutes walking\n\nGeneral Health Tips:\n- Get enough sleep\n- Manage stress effectively");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [token]);

    const formatRecommendationItem = (item) => {
        const colonIndex = item.indexOf(':');
        
        if (colonIndex > 0) {
            const beforeColon = item.substring(0, colonIndex + 1);
            const afterColon = item.substring(colonIndex + 1);
            return (
                <>
                    <span className="bold-part">{beforeColon}</span>
                    {afterColon}
                </>
            );
        }
        return item;
    };

    const parseRecommendations = (text) => {
        if (!text) return null;
        
        const cleanedText = text
            .replace(/^\d+\.\s*/gm, '')
            .replace(/\*\*/g, '')
            .replace(/#/g, '')
            .replace(/---/g, '')
            .trim();
        
        const sections = cleanedText.split(/\n\s*\n/).filter(section => section.trim());
        
        return sections.map((section, index) => {
            const firstLine = section.split('\n')[0];
            const titleMatch = firstLine.match(/^([^:\n]+):?/);
            const title = titleMatch ? titleMatch[1].trim() : `Recommendation ${index + 1}`;
            const content = titleMatch ? section.substring(titleMatch[0].length).trim() : section;
            
            const items = content.split('\n').filter(item => item.trim());
            
            return (
                <div key={index} className="recommendation-section">
                    <h3 className="section-title">{title}</h3>
                    <ul className="recommendation-list">
                        {items.map((item, idx) => {
                            const trimmedItem = item.replace(/^- /, '').trim();
                            return (
                                <li key={idx} className="recommendation-item">
                                    <span className="item-text">
                                        {formatRecommendationItem(trimmedItem)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    if (loading) return (
        <div className="recommendations-container">
            <div className="recommendations-header">
                <h2>Personalized Health Recommendations</h2>
            </div>
            <div className="recommendations-loading">
                <div className="loading-spinner"></div>
                <p>Generating your personalized recommendations...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="recommendations-container">
            <div className="recommendations-header">
                <h2>Personalized Health Recommendations</h2>
            </div>
            <div className="recommendations-error">
                {error}
            </div>
        </div>
    );

    return (
        <div className="recommendations-container">
            <div className="recommendations-header">
                <h2>Personalized Health Recommendations</h2>
            </div>
            
            {recommendations ? (
                <div className="recommendations-content">
                    {parseRecommendations(recommendations)}
                </div>
            ) : (
                <div className="waiting-message">
                    No recommendations available yet. Please check back later.
                </div>
            )}
        </div>
    );
};

export default Recommendations;