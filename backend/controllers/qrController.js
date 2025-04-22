require('dotenv').config();
const QRCode = require('../models/QRCode');
const { generateQR, formatMedicalProfile, saveProfileHTML } = require('../utils/generateQR');
const MedicalProfile = require('../models/MedicalProfile');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

exports.createQRCode = async (req, res) => {
    const { userId } = req.body;

    try {
        // Find the medical profile for the user
        const medicalProfile = await MedicalProfile.findOne({ userId }).sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();
        if (!medicalProfile) {
            return res.status(404).json({ message: 'Medical profile not found' });
        }
        
        // Get the server's IP address dynamically
        const getServerIP = () => {
            const interfaces = require('os').networkInterfaces();
            for (const interface in interfaces) {
                for (const addr of interfaces[interface]) {
                    if (addr.family === 'IPv4' && !addr.internal) {
                        return addr.address;
                    }
                }
            }
            return 'localhost'; // Fallback to localhost if no external IP is found
        };

        // Generate the URL for the HTML file
        // const serverIP = getServerIP();

        // Send SMS to emergency contact
        // try {
        //     const emergencyContact = medicalProfile.emergencyContacts; // Assuming this is a phone number
        //     const message = `Emergency Alert: ${medicalProfile.name} needs assistance!`;
    
        //     await twilioClient.messages.create({
        //         body: message,
        //         from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        //         to: emergencyContact, // Emergency contact's phone number
        //     });
        //     console.log("message sent");
            
        // } catch (error) {
        //     console.error("not sent",error);
            
        // }

        // Generate HTML content for the user's profile
        const htmlContent = await formatMedicalProfile(medicalProfile);
        // console.log(htmlContent);
        // Save the HTML file
        const htmlFilePath = await saveProfileHTML(htmlContent, userId);

        // console.log(htmlFilePath);
        
        //ngrok url
        // const serverIP = "https://2a1e-139-5-242-32.ngrok-free.app";
        
        const serverIP = process.env.NGROK_URL;

        // Generate the URL for the HTML file

        const htmlFileUrl = `${serverIP}/profiles/${userId}_profile.html`;

        // const htmlFileUrl = `http://${serverIP}:5000/profiles/${userId}_profile.html`; 

        // console.log(htmlFileUrl);
        

        // Generate the QR code with the URL
        const qrCodeImage = await generateQR(htmlFileUrl);
        medicalProfile.qrCodeImage = qrCodeImage; // Set the qrCodeImage property
        await medicalProfile.save();

        // Create a new QR code document
        const newQRCode = new QRCode({
            data: qrCodeImage, // Save the generated QR code image
            userId, // Store the user ID
        });

        // Save the QR code to the database
        await newQRCode.save();

        // Respond with the new QR code document and the path to the HTML file
        res.status(201).json({ qrCode: newQRCode, htmlFilePath });
    } catch (error) {
        console.error('Error creating QR code:', error);
        res.status(500).json({ message: 'Error creating QR code' });
    }
};

exports.getQRCode = async (req, res) => {
    const { userId } = req.params;

    try {
        const qrCode = await QRCode.findOne({ userId })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec(); // Execute the query;
         // Find the QR code for the user
        if (!qrCode) {
            return res.status(404).json({ message: 'QR code not found' });
        }
        res.status(200).json({qrCode}); // Return the QR code
    } catch (error) {
        console.error('Error fetching QR code:', error);
        res.status(500).json({ message: 'Error fetching QR code' });
    }
};