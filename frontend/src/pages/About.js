import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/About.css';
import aboutHero from '../assests/about-hero.jpg';
import aboutUsImage from '../assests/about-us.jpg';




const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <div className="about-hero" style={{ backgroundImage: `url(${aboutHero})` }}>
        <div className="hero-overlay">
          <h1>About ElderlyCare</h1>
          <p>Compassionate technology for senior healthcare</p>
        </div>
      </div>

      {/* About Us Section - Modified Layout */}
      <section className="section-about">
        <div className="container">
          <div className="about-content">
            <h2>Who We Are</h2>
            <p>
            ElderlyCare is a pioneering healthcare platform designed to enhance seniors' lives through innovative technology. Founded in 2025 by healthcare professionals and technologists, we combine medical expertise with user-friendly solutions to provide high-quality, accessible care that promotes well-being, independence, and a better quality of life.
            </p>
            <p>By leveraging advanced innovations, ElderlyCare empowers seniors and caregivers with intuitive tools. Our platform simplifies healthcare management, enhances communication with medical professionals, and improves overall well-being, ensuring dignity, comfort, and support for aging individuals worldwide.</p>
          </div>
          <div className="about-image">
            <img 
              src={aboutUsImage} 
              alt="ElderlyCare team helping seniors" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Additional Content Below */}
      <section className="section-details">
        <div className="container">
          <div className="details-content">
            
            
            <h3>Our Approach</h3>
            <p>
              We take a holistic approach to senior care, focusing on three key pillars: accessibility, security, 
              and personalization. Our platform is designed specifically with seniors in mind, featuring large text, 
              intuitive navigation, and voice assistance.
            </p>
            
            <h3>Technology with Compassion</h3>
            <p>
              While we leverage cutting-edge technology like AI health recommendations and emergency QR codes, 
              we never forget the human element. Every feature is tested with real seniors to ensure it meets 
              their needs and capabilities.
            </p>
            
            <h3>Commitment to Privacy</h3>
            <p>
              We implement military-grade encryption and strict access controls to protect our users' sensitive 
              health information. Your data belongs to you, and we're committed to keeping it secure.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-team">
  <div className="container">
    <h2>Our Team</h2>
    <div className="team-grid">
      {[
        {
          name: "Mohammad Kaif",
          role: "Frontend Developer",
          bio: "Specializes in React and modern web technologies",
          color: "#FF6B6B"
        },
        {
          name: "Madhur Panghal",
          role: "Backend Developer",
          bio: "Expert in server-side architecture and databases",
          color: "#4ECDC4"
        },
        {
          name: "Mohammad Affan",
          role: "UI/UX Designer",
          bio: "Creates intuitive and accessible user interfaces",
          color: "#FFD166"
        },
        {
          name: "Ibrahim Saud",
          role: "Quality Assurance Tester",
          bio: "Ensures flawless user experience and functionality",
          color: "#06D6A0"
        }
      ].map((member, index) => (
        <div className="team-card" key={index}>
          <div 
            className="member-photo"
            style={{ backgroundColor: member.color }}
          ></div>
          <h3>{member.name}</h3>
          <p className="role">{member.role}</p>
          <p className="bio">{member.bio}</p>
        </div>
      ))}
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

export default About;