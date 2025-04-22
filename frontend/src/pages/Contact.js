import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Contact.css';
import aboutHero from '../assests/about-hero.jpg';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Banner with about-hero image */}
      <div 
        className="contact-hero" 
        style={{ backgroundImage: `url(${aboutHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-overlay">
          <h1>Contact Us</h1>
          <p>We're here to help you with all your senior care needs</p>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="section-contact-info">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-method">
              <div className="contact-emoji">📞</div>
              <h3>Phone Support</h3>
              <p>Available 24/7 for urgent matters</p>
              <p className="contact-detail">+1 (800) 555-ELDER</p>
            </div>

            <div className="contact-method">
              <div className="contact-emoji">✉️</div>
              <h3>Email Us</h3>
              <p>Typically respond within 24 hours</p>
              <p className="contact-detail">support@elderlycare.com</p>
            </div>

            <div className="contact-method">
              <div className="contact-emoji">🏢</div>
              <h3>Visit Us</h3>
              <p>Our headquarters in New Delhi</p>
              <p className="contact-detail">123 Care Avenue, Healthcare District</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Contact Form Section */}
      <section className="section-contact-form">
        <div className="container">
          <div className="form-container">
            <h2>Send Us a Message</h2>
            <p className="form-intro">Have questions? Our team will get back to you shortly.</p>
            
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  rows="6" 
                  placeholder="How can we assist you today?" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;