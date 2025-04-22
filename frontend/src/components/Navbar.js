import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../components/Navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from '../assests/logo.png';
import { FaUserCircle, FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const dropdownRef = useRef(null);
    const authDropdownRef = useRef(null);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
            if (authDropdownRef.current && !authDropdownRef.current.contains(e.target)) {
                setAuthDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("You have successfully logged out!");
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    const handleHomeClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Close other dropdowns when mobile menu toggles
        setDropdownOpen(false);
        setAuthDropdownOpen(false);
    };

    const closeAllMenus = () => {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
        setAuthDropdownOpen(false);
    };

    return (
        <nav className="navbar">
            <ToastContainer position="top-right" />
            
            {/* Logo on the left */}
            <div className="logo">
                <Link to="/" onClick={handleHomeClick}>
                    <img src={logoImage} alt="Company Logo" className="logo-image" />
                </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                    <FaTimes size={24} className="menu-icon" />
                ) : (
                    <FaBars size={24} className="menu-icon" />
                )}
            </div>
            
            {/* Navigation links in the center (desktop) */}
            <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={closeAllMenus}
                >
                    Home
                </Link>
                <Link 
                    to="/about" 
                    className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                    onClick={closeAllMenus}
                >
                    About
                </Link>
                <Link 
                    to="/services" 
                    className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
                    onClick={closeAllMenus}
                >
                    Services
                </Link>
                <Link 
                    to="/contact" 
                    className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                    onClick={closeAllMenus}
                >
                    Contact
                </Link>
            </div>
            
            {/* Auth section on the right */}
            <div className={`auth-section ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {user ? (
                    <div className="user-dropdown" ref={dropdownRef}>
                        <div 
                            className="user-info" 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <FaUserCircle className="user-icon" size={24} />
                            {!isMobile && <span className="user-text">{user.name || 'My Account'}</span>}
                            {dropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link 
                                    to="/profile" 
                                    className={`dropdown-item ${location.pathname === '/profile' ? 'active' : ''}`}
                                    onClick={closeAllMenus}
                                >
                                    My Profile
                                </Link>
                                <Link 
                                    to="/dashboard" 
                                    className={`dropdown-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                                    onClick={closeAllMenus}
                                >
                                    Dashboard
                                </Link>
                                <div className="dropdown-divider"></div>
                                <div 
                                    className="dropdown-item logout" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-dropdown" ref={authDropdownRef}>
                        <div 
                            className="auth-toggle" 
                            onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                        >
                            <FaUserCircle className="user-icon" size={24} />
                            {!isMobile && <span className="auth-text">Account</span>}
                            {authDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </div>
                        {authDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link 
                                    to="/login" 
                                    className={`dropdown-item ${location.pathname === '/login' ? 'active' : ''}`}
                                    onClick={closeAllMenus}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className={`dropdown-item ${location.pathname === '/register' ? 'active' : ''}`}
                                    onClick={closeAllMenus}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;