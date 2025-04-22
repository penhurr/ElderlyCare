import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutHero from '../assests/about-hero.jpg';
import './Profile.css';
import html2canvas from 'html2canvas';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [medicalProfile, setMedicalProfile] = useState(null);
    const [qrCode, setQrCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const idCardRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');
                
                const medicalResponse = await axios.get(
                    `http://localhost:5000/api/medical/${user._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                const qrResponse = await axios.get(
                    `http://localhost:5000/api/qr/${user._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setMedicalProfile(medicalResponse.data);
                setQrCode(qrResponse.data.qrCode.data);
            } catch (error) {
                toast.error('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const downloadIDCard = async () => {
        if (!idCardRef.current || !medicalProfile) return;

        try {
            const canvas = await html2canvas(idCardRef.current, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: null
            });

            const link = document.createElement('a');
            link.download = `ElderlyCare-ID-${medicalProfile.name.replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            toast.success('ID Card downloaded successfully!');
        } catch (error) {
            toast.error('Failed to download ID Card');
        }
    };

    if (isLoading) {
        return (
            <div className="profile-page">
                <div className="loading-message">Loading profile data...</div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-hero" style={{ backgroundImage: `url(${aboutHero})` }}>
                <div className="hero-overlay">
                    <h1>My Profile</h1>
                    <p>View your personal and medical information</p>
                </div>
            </div>

            <div className="profile-container">
                <ToastContainer position="top-right" autoClose={3000} />
                
                <div className="profile-header">
                    <h1 className="profile-title">Welcome, {medicalProfile?.name || 'User'}</h1>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="profile-grid">
                        <div className="info-card">
                            <p><strong>Full Name:</strong> {medicalProfile?.name || 'N/A'}</p>
                            <p><strong>Age:</strong> {medicalProfile?.age || 'N/A'}</p>
                            <p><strong>Gender:</strong> {medicalProfile?.gender || 'N/A'}</p>
                        </div>
                        <div className="info-card">
                            <p><strong>Blood Group:</strong> {medicalProfile?.bloodGroup || 'N/A'}</p>
                            <p><strong>Height:</strong> {medicalProfile?.height ? `${medicalProfile.height} cm` : 'N/A'}</p>
                            <p><strong>Weight:</strong> {medicalProfile?.weight ? `${medicalProfile.weight} kg` : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Contact Details</h2>
                    <div className="profile-grid">
                        <div className="info-card">
                            <p><strong>Phone Number:</strong> {medicalProfile?.phone || 'N/A'}</p>
                            <p><strong>Address:</strong> {medicalProfile?.address || 'N/A'}</p>
                        </div>
                        <div className="info-card">
                            <p><strong>Emergency Contact:</strong> {medicalProfile?.emergencyContact || 'N/A'}</p>
                            <p><strong>Emergency Phone:</strong> {medicalProfile?.emergencyPhone || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Medical Information</h2>
                    <div className="profile-grid">
                        <div className="info-card">
                            <p><strong>Medical History:</strong> {medicalProfile?.medicalHistory || 'None reported'}</p>
                            <p><strong>Allergies:</strong> {medicalProfile?.allergies || 'None reported'}</p>
                        </div>
                        <div className="info-card">
                            <p><strong>Current Medications:</strong> {medicalProfile?.medications || 'None reported'}</p>
                            <p><strong>Current Symptoms:</strong> {medicalProfile?.currentSymptoms || 'None reported'}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2 className="section-title">Insurance Information</h2>
                    <div className="profile-grid">
                        <div className="info-card">
                            <p><strong>Insurance Status:</strong> {medicalProfile?.hasInsurance ? 'Active' : 'Not Active'}</p>
                            {medicalProfile?.hasInsurance && (
                                <>
                                    <p><strong>Provider:</strong> {medicalProfile?.insuranceProvider || 'N/A'}</p>
                                    <p><strong>Policy Number:</strong> {medicalProfile?.policyNumber || 'N/A'}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="id-card-section">
                    <div className="id-card-container">
                        <div className="id-card-content" ref={idCardRef}>
                            <div className="id-card-header">ELDERLYCARE</div>
                            <div className="id-card-subheader">ID CARD</div>
                            <div className="id-card-name">
                                {medicalProfile?.name.toUpperCase() || 'N/A'}
                            </div>
                            {/* <div className="id-card-details">
                                <p><strong>Emergency Contact:</strong></p>
                                <p>{medicalProfile?.emergencyContact || 'N/A'}</p>
                                <p><strong>Emergency Phone:</strong></p>
                                <p>{medicalProfile?.emergencyPhone || 'N/A'}</p>
                            </div> */}
                            <div className="id-card-qr">
                                {qrCode ? (
                                    <img src={qrCode} alt="Medical QR Code" />
                                ) : (
                                    <div className="qr-placeholder">QR Code Not Available</div>
                                )}
                            </div>
                            <div className="id-card-footer">
                                <p>Scan QR code in case of emergency</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="id-card-instructions">
  <div>
    <h3>How to Use Your ID Card</h3>
    <p>
      Your ElderlyCare ID Card contains important medical information that can be 
      accessed by scanning the QR code in case of emergency. Keep this card with 
      you at all times.
    </p>
    <p>
      Medical professionals can scan the QR code to access your vital health 
      information when you're unable to communicate. This includes your medical 
      history, allergies, and current medications.
    </p>
    <p>
      For your safety, we recommend keeping a digital copy of this ID card on 
      your phone and a printed copy in your wallet or purse.
    </p>
  </div>
  <button 
    className="download-id-btn" 
    onClick={downloadIDCard}
    disabled={!medicalProfile || !qrCode}
  >
    Download ID Card
  </button>
</div>
                </div>
            </div>

            <footer className="footer-section">
                <p>&copy; 2025 ElderlyCare. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Profile;