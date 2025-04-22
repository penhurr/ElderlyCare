import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../components/QRCodeDisplay.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRCodeDisplay = () => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const handleGenerateQR = async () => {
        if (!user) {
            toast.error('Please log in to generate a QR code.');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/qr',
                { userId: user._id },
                { headers: { Authorization: `Bearer ${token}` } }); // Use the logged-in user's ID
            setQrCode(response.data.qrCode.data);
            toast.success("QR Code generated successfully!" , { autoClose: 1000 }, { autoClose: true })
        } catch (error) {
            console.error('Error generating QR code:', error);
            toast.error("Error generating QR Code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="qr-container">
            <ToastContainer />
            <button 
                onClick={handleGenerateQR}
                disabled={loading}
                className={`generate-btn ${loading ? 'loading' : ''}`}
            >
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Generating...
                    </>
                ) : (
                    'Generate QR Code'
                )}
            </button>
            
            {loading && !qrCode && (
                <div className="loading-placeholder">
                    <div className="loading-spinner"></div>
                    <p>Creating your QR code...</p>
                </div>
            )}
            
            {qrCode && <img src={qrCode} alt="QR Code" className="qr-image" />}
        </div>
    );
};

export default QRCodeDisplay;