import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutHero from '../assests/about-hero.jpg';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                age: parseInt(age),
                role,
            });

            toast.success("Registration successful! Redirecting to login...", {
                autoClose: 1000
            });
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-page">
            {/* Hero Banner */}
            <div 
                className="register-hero" 
                style={{ backgroundImage: `url(${aboutHero})` }}
            >
                <div className="hero-overlay">
                    <h1>Create Your Account</h1>
                    <p>Join our community for personalized care services</p>
                </div>
            </div>

            {/* Registration Section */}
            <section className="section-register">
                <div className="container">
                    <div className="register-box">
                        <h2>Register</h2>
                        <form className="register-form" onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    placeholder="30"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    value={role}
                                    readOnly
                                    className="read-only-input"
                                />
                            </div>
                            
                            <button type="submit" className="submit-button">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer-section">
                <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
            </footer>

            <ToastContainer />
        </div>
    );
};

export default Register;