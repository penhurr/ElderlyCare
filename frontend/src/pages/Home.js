import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';
import banner1 from '../assests/banner1.jpg';
import banner2 from '../assests/banner2.jpg';
import banner3 from '../assests/banner3.jpg';
import aboutUsImage from '../assests/about-us.jpg';
import whyChooseUsImage from '../assests/why-choose-us.jpg';

const Home = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [activeFaq, setActiveFaq] = useState(null);
    const [visibleFeatures, setVisibleFeatures] = useState([]);

    // Banner data
    const banners = [
        {
            image: banner1,
            heading: "Welcome to ElderlyCare ",
            paragraph: "Empowering seniors with accessible health records anytime, anywhere.",
        },
        {
            image: banner2,
            heading: "Instant Medical Access ",
            paragraph: "Scan the QR code in emergencies to access vital health information",
        },
        {
            image: banner3,
            heading: "Smart Health Recommendations ",
            paragraph: "Personalized health tips based on medical history for better well-being.",
        },
    ];

    // Features data (12 items)
    const features = [
        {
            emoji: "📝",
            title: "Profile Management",
            description: "Securely store personal details, medical history, and prescriptions."
        },
        {
            emoji: "📲",
            title: "QR Code System",
            description: "Instant emergency access to essential health information."
        },
        {
            emoji: "💡",
            title: "Health Recommendations",
            description: "Personalized insights based on medical conditions."
        },
        {
            emoji: "👩‍⚕️",
            title: "Caregiver Access",
            description: "Authorized caregivers can view and manage health details."
        },
        {
            emoji: "🔔",
            title: "Medication Reminders",
            description: "Smart medication reminder system."
        },
        {
            emoji: "📊",
            title: "Health Analytics",
            description: "Track and visualize health metrics over time."
        },
        {
            emoji: "🏥",
            title: "Hospital Records",
            description: "Store and access all hospital visit records."
        },
        {
            emoji: "💊",
            title: "Prescription Tracker",
            description: "Manage all your medications in one place."
        },
        {
            emoji: "🩺",
            title: "Virtual Checkups",
            description: "Schedule and attend virtual doctor appointments."
        },
        {
            emoji: "📅",
            title: "Appointment Scheduler",
            description: "Never miss important medical appointments."
        },
        {
            emoji: "🔄",
            title: "Data Sync",
            description: "Sync across all your devices seamlessly."
        },
        {
            emoji: "🔐",
            title: "Advanced Security",
            description: "Military-grade encryption for your data."
        }
    ];

    // Why Choose Us data (new format)
    const whyChooseUs = [
        {
            title: "Comprehensive Health Management",
            description: "All your medical records in one secure, easy-to-access platform."
        },
        {
            title: "Emergency Ready",
            description: "Critical health information available instantly when needed most."
        },
        {
            title: "User-Centric Design",
            description: "Simple interface designed specifically for senior users."
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock assistance for you and your caregivers."
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: "How does the QR code system work?",
            answer: "Each user gets a unique QR code linked to their medical history. In an emergency, scanning the code provides instant access to critical health information."
        },
        {
            question: "Is my medical data secure on ElderlyCare?",
            answer: "Yes, we use advanced security protocols to ensure that your medical records remain private and accessible only to authorized users."
        },
        {
            question: "Can caregivers access a senior's medical records?",
            answer: "Yes, caregivers with permission can securely view and update a senior's health records for better management."
        },
        {
            question: "What kind of health recommendations does ElderlyCare provide?",
            answer: "Our system analyzes medical history to offer personalized suggestions on diet, lifestyle, and preventive care."
        },
        {
            question: "Is ElderlyCare easy to use for seniors?",
            answer: "Absolutely! Our platform is designed with a simple and user-friendly interface to ensure seniors can navigate it with ease."
        }
    ];

    // Auto-rotate banners
        useEffect(() => {
            const bannerInterval = setInterval(() => {
                setCurrentBanner((prev) => (prev + 1) % banners.length);
            }, 10000);
            return () => clearInterval(bannerInterval);
        }, [banners.length]);
    
        // Auto-rotate features
        useEffect(() => {
            const featureInterval = setInterval(() => {
                setCurrentFeature((prev) => (prev + 1) % (features.length ));
            }, 3000);
            return () => clearInterval(featureInterval);
        }, [features.length]);
    
        
    
        const nextBanner = () => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        };
    
        const prevBanner = () => {
            setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
        };
    
        const nextFeature = () => {
            setCurrentFeature((prev) => (prev + 1) % (features.length ));
        };
    
        const prevFeature = () => {
            setCurrentFeature((prev) => (prev - 1 + features.length ) % features.length );
        };
    
        
    
        const toggleFaq = (index) => {
            setActiveFaq(activeFaq === index ? null : index);
        };
    return (
        <div className="home-container">
            {/* Banner Section */}
            <div className="banner-section" style={{ backgroundImage: `url(${banners[currentBanner].image})` }}>
                <div className="banner-content">
                    <h1>{banners[currentBanner].heading}</h1>
                    <p>{banners[currentBanner].paragraph}</p>
                </div>
                <div className="banner-controls">
                    <button className="prev-button" onClick={prevBanner}>&lt;</button>
                    <button className="next-button" onClick={nextBanner}>&gt;</button>
                </div>
            </div>

            {/* About Section */}
            <div className="section-container">
                <div className="about-section section-header">
                    <h2>About Us</h2>
                    <div className="about-content-wrapper">
                        <div className="about-image">
                            <img
                                src={aboutUsImage}
                                alt="About Us"
                                className="about-image-transition"
                            />
                        </div>
                        <div className="about-content">
                            <p>ElderlyCare is a platform designed to help seniors manage their health records easily. It provides quick access to medical details via a QR code during emergencies, ensuring vital information is always available when needed.</p>
                            <p>With personalized health recommendations, ElderlyCare promotes better well-being and peace of mind for both users and caregivers. By simplifying health management, we empower seniors to take control of their medical information while offering reassurance to their loved ones.</p>
                            
                            <Link to="/about" className="learn-more-button">
                                Learn More 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container">
                <div className="section features-slider-section">
                    <div className="section-header">
                        <h2>Key Features</h2>
                        <p>Everything you need for comprehensive health management</p>
                    </div>
                    
                    <div className="features-slider-container">
                        <button className="slider-nav prev" onClick={prevFeature}>&lt;</button>
                        <div className="features-slider">
                            <div className="slider-track" style={{ 
                                transform: `translateX(-${currentFeature * (100/3)}%)`,
                                transition: 'transform 0.5s ease'
                            }}>
                                {[...features, ...features].map((feature, index) => (
                                    <div key={index} className="slide">
                                        <div className="feature-emoji">{feature.emoji}</div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="slider-nav next" onClick={nextFeature}>&gt;</button>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="section-container">
                <div className="mission-vision-section">
                    <div className="mission-box">
                        <h3>🌍 Our Mission</h3>
                        <p>To empower seniors with a simple and effective platform for managing their health and medical information, ensuring immediate access during emergencies and providing personalized health recommendations for enhanced well-being.</p>
                    </div>
                    <div className="vision-box">
                        <h3>👁️ Our Vision</h3>
                        <p>To create a world where elderly healthcare is seamless, secure, and instantly accessible, fostering independence and peace of mind for seniors and their caregivers.</p>
                    </div>
                </div>
            </div>

            <div className="quote-panel-container">
                <div className="quote-panel">
                    <div className="quote-content">
                        <h2>Get Your Free Health Consultation!</h2>
                        <p>ElderlyCare provides exceptional, personalized health management solutions that enhance senior well-being, merging medical expertise and compassionate care for memorable healthcare experiences.</p>
                        <Link to="/contact" className="enquire-button">Book Consultation →</Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section - New Design */}
            <div className="section-container">
                <div className="why-choose-us-section">
                    <div className="section-header">
                        <h2>Why Choose Us?</h2>
                        <p>Discover what makes ElderlyCare the best choice for senior health management</p>
                    </div>
                    
                    <div className="why-choose-us-content">
                        <div className="why-choose-us-image">
                            <img 
                                src={whyChooseUsImage}
                                alt="Happy senior with caregiver"
                                className="floating-image"
                            />
                        </div>
                        <div className="why-choose-us-list">
                            <ul>
                                {whyChooseUs.map((item, index) => (
                                    <li key={index}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="section-container">
                <div className="faq-section">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Find answers to common questions about ElderlyCare</p>
                    </div>
                    <div className="faq-container">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-question">
                                    <h3>{faq.question}</h3>
                                    <span>{activeFaq === index ? '−' : '+'}</span>
                                </div>
                                {activeFaq === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer-section">
                <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;