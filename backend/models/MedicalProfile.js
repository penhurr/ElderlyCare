const mongoose = require('mongoose');

const medicalProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Personal Information
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    height: { type: Number },
    weight: { type: Number },
    
    // Contact Information
    phone: { type: String },
    emergencyContact: { type: String },
    emergencyPhone: { type: String },
    address: { type: String },
    
    // Medical Information
    medicalHistory: { type: String },
    allergies: { type: String },
    medications: { type: String },
    currentSymptoms: { type: String },
    
    // Insurance Information
    hasInsurance: { type: Boolean, default: false },
    insuranceProvider: { type: String },
    policyNumber: { type: String },
    
    qrCodeImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MedicalProfile', medicalProfileSchema);