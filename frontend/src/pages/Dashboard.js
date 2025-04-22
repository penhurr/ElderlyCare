import React, { useState } from 'react';
import MedicalForm from '../components/MedicalForm';
import QRCodeDisplay from '../components/QRCodeDisplay';
import Recommendations from '../components/Recommendations';
import aboutHero from '../assests/about-hero.jpg';
import './Dashboard.css';

const Dashboard = () => {
    const [medicalFormSubmitted, setMedicalFormSubmitted] = useState(false);
    
    return (
        <div className="dashboard-page">
            {/* Hero Banner */}
            <div 
                className="dashboard-hero" 
                style={{ backgroundImage: `url(${aboutHero})` }}
            >
                <div className="hero-overlay">
                    <h1>Your Dashboard</h1>
                    <p>Manage your health information and access services</p>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-container">
                <div className="dashboard-section">
                    <MedicalForm onSubmissionSuccess={() => setMedicalFormSubmitted(true)} />
                </div>
                <div className="dashboard-section">
                    <QRCodeDisplay />
                </div>
                <div className="dashboard-section recommendations" id="recommendations">
                    {medicalFormSubmitted ? (
                        <Recommendations />
                    ) : (
                        <div className="waiting-message pulse-animation">
                            <i className="fas fa-heartbeat" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                            <p>We're ready to generate your recommendations once you submit your health information</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer-section">
                <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;