import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Services.css';
import aboutHero from '../assests/about-hero.jpg'; // Import the same hero image

const Services = () => {
  return (
    <div className="services-page">
      {/* Hero Banner with about-hero image */}
      <div 
        className="services-hero" 
        style={{ backgroundImage: `url(${aboutHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-overlay">
          <h1>Our Services</h1>
          <p>Comprehensive care solutions for seniors and their families</p>
        </div>
      </div>

      {/* Rest of the code remains exactly the same */}
      <section className="section-overview">
        <div className="container">
          <div className="overview-content">
            <h2>Tailored Care Solutions</h2>
            <p>
              ElderlyCare offers a suite of specialized services designed to address the unique needs of seniors. 
              Our technology-driven solutions bridge the gap between professional healthcare and home care, 
              ensuring safety, comfort, and independence for our elderly users.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section with Emojis */}
      <section className="section-services">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-emoji">❤️🩺</div>
              <div className="service-content">
                <h3>Health Monitoring</h3>
                <p>
                  Real-time tracking of vital signs including blood pressure, glucose levels, 
                  and heart rate with automatic alerts to caregivers and healthcare providers.
                </p>
                <ul>
                  <li>24/7 health data tracking</li>
                  <li>Medication reminders</li>
                  <li>Automated health reports</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-emoji">🚨🆘</div>
              <div className="service-content">
                <h3>Emergency Response</h3>
                <p>
                  Immediate assistance at the push of a button with our wearable emergency 
                  alert system connected to local emergency services and family members.
                </p>
                <ul>
                  <li>Fall detection technology</li>
                  <li>GPS location tracking</li>
                  <li>24/7 monitoring center</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-emoji">👨‍⚕️💬</div>
              <div className="service-content">
                <h3>Caregiver Connection</h3>
                <p>
                  Seamless communication platform connecting seniors with professional 
                  caregivers, family members, and healthcare providers.
                </p>
                <ul>
                  <li>Video consultation</li>
                  <li>Care coordination tools</li>
                  <li>Activity tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-additional">
        <div className="container">
          <h2>Additional Features</h2>
          <div className="features-grid">
            {[
              {
                title: "Medication Management",
                description: "Automated dispenser with reminders and dosage tracking",
                emoji: "💊⏰"
              },
              {
                title: "Cognitive Exercises",
                description: "Personalized brain training activities to maintain mental acuity",
                emoji: "🧠🏋️"
              },
              {
                title: "Nutrition Planning",
                description: "Meal recommendations based on health conditions and preferences",
                emoji: "🍎📋"
              },
              {
                title: "Social Connection",
                description: "Easy-to-use video calling and community engagement features",
                emoji: "👥💻"
              }
            ].map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-emoji">{feature.emoji}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-cta">
        <div className="container">
          <h2>Ready to Experience Better Senior Care?</h2>
          <p>Contact us today to learn how ElderlyCare can support your family's needs</p>
          <Link to="/contact" className="cta-button">Get Started</Link>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="footer-section">
        <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;