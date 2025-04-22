import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MedicalForm.css';

const MedicalForm = ({ onSubmissionSuccess }) => {
    const [formData, setFormData] = useState({
        // Personal Information
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        height: '',
        weight: '',
        
        // Contact Information
        phone: '',
        emergencyContact: '',
        emergencyPhone: '',
        address: '',
        
        // Medical Information
        medicalHistory: '',
        allergies: '',
        medications: '',
        currentSymptoms: '',
        
        // Insurance Information
        hasInsurance: false,
        insuranceProvider: '',
        policyNumber: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('No token found. Please log in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/medical', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            toast.success('Medical information submitted successfully!', { autoClose: 1000 }, { autoClose: true });
            onSubmissionSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.message || 'Error submitting form. Please try again.', { 
                autoClose: 2000 
            });
        }
    };

    return (
        <div className="medical-form-container">
            <h2>Medical Information Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <fieldset className="form-section">
                    <legend>Personal Information</legend>
                    <div className="form-group">
                        <label>Full Name*</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Blood Group</label>
                            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Height (cm)</label>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Weight (kg)</label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>

                {/* Contact Information Section */}
                <fieldset className="form-section">
                    <legend>Contact Information</legend>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Emergency Contact Name</label>
                            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Emergency Phone</label>
                            <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
                    </div>
                </fieldset>

                {/* Medical Information Section */}
                <fieldset className="form-section">
                    <legend>Medical Information</legend>
                    <div className="form-group">
                        <label>Medical History</label>
                        <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows="4" />
                    </div>
                    <div className="form-group">
                        <label>Allergies</label>
                        <textarea name="allergies" value={formData.allergies} onChange={handleChange} rows="3" />
                    </div>
                    <div className="form-group">
                        <label>Current Medications</label>
                        <textarea name="medications" value={formData.medications} onChange={handleChange} rows="3" />
                    </div>
                    <div className="form-group">
                        <label>Current Symptoms</label>
                        <textarea name="currentSymptoms" value={formData.currentSymptoms} onChange={handleChange} rows="3" />
                    </div>
                </fieldset>

                {/* Insurance Information Section */}
                <fieldset className="form-section">
                    <legend>Insurance Information</legend>
                    <div className="form-group checkbox-group">
                        <input type="checkbox" name="hasInsurance" checked={formData.hasInsurance} onChange={handleChange} />
                        <label>Do you have health insurance?</label>
                    </div>
                    {formData.hasInsurance && (
                        <>
                            <div className="form-group">
                                <label>Insurance Provider</label>
                                <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Policy Number</label>
                                <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
                            </div>
                        </>
                    )}
                </fieldset>

                <button type="submit" className="submit-button">Submit Medical Information</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default MedicalForm;