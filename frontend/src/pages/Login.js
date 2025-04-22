import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutHero from '../assests/about-hero.jpg';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            if (response.data && response.data.token && response.data.user) {
                const userData = response.data.user;

                localStorage.setItem("token", response.data.token);
                login(userData);
                
                toast.success("Login successful! Redirecting to dashboard...", {
                    autoClose: 1000
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                toast.error("Unexpected response structure. Please try again.");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="login-page">
            {/* Hero Banner */}
            <div 
                className="login-hero" 
                style={{ backgroundImage: `url(${aboutHero})` }}
            >
                <div className="hero-overlay">
                    <h1>Welcome Back</h1>
                    <p>Login to access your personalized dashboard</p>
                </div>
            </div>

            {/* Login Section */}
            <section className="section-login">
                <div className="container">
                    <div className="login-box">
                        <h2>Login to Your Account</h2>
                        <form className="login-form" onSubmit={handleLogin}>
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
                            
                            <button type="submit" className="submit-button">
                                Login
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

export default Login;