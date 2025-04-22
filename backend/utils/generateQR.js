require('dotenv').config();
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { generateFirstAidRecommendations } = require('../controllers/recommendationController');

exports.generateQR = async (data) => {
    try {
        const qrCode = await QRCode.toDataURL(data);
        // console.log(qrCode);

        return qrCode;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
};

exports.formatMedicalProfile = async (profile) => {

    try {
        // console.log(profile);

        // const getServerIP = () => {
        //     const interfaces = require('os').networkInterfaces();
        //     for (const interface in interfaces) {
        //         for (const addr of interfaces[interface]) {
        //             if (addr.family === 'IPv4' && !addr.internal) {
        //                 return addr.address;
        //             }
        //         }
        //     }
        //     return 'localhost'; // Fallback to localhost if no external IP is found
        // };

        // const serverIP = getServerIP();

        // const serverIP = "https://2a1e-139-5-242-32.ngrok-free.app";

        const serverIP = process.env.NGROK_URL;


        const firstAidRecommendations = await generateFirstAidRecommendations(profile);

        const formattedRecommendations = firstAidRecommendations
            
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            
            .replace(/###\s*/g, '')
            
            .replace(/---+/g, '')
            
            .replace(/\n\n+/g, '\n')
            .trim()
            
            .split('\n')
            .filter(line => line.trim() !== '')
            // Format each line appropriately
            .map((line, index) => {
                // Check if line is a heading (contains bold text)
                if (/<strong>.*<\/strong>/.test(line)) {
                    return `<h3 class="recommendation-heading">${line}</h3>`;
                }
                // Check if line starts with a number (1., 2., etc.)
                if (/^\d+\.\s/.test(line)) {
                    return `<li class="numbered-item">${line}</li>`;
                }
                // Check if line starts with a bullet (- or *)
                if (/^[-*]\s/.test(line)) {
                    return `<li class="bullet-item">${line.replace(/^[-*]\s/, '')}</li>`;
                }
                // Default case - regular paragraph
                return `<p>${line}</p>`;
            })
            .join('');

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Medical Profile - ${profile.name || 'Patient'}</title>
            
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .section {
                    margin-bottom: 30px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 20px;
                }
                .section-title {
                    color: #0066ff;
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                }
                .section-title:after {
                    content: '−';
                    font-size: 20px;
                }
                .section-title.collapsed:after {
                    content: '+';
                }
                #reader {
                    width: 100%;
                    max-width: 600px;
                    height: 400px;
                    margin: 20px auto;
                    border: 1px solid #ccc;
                }
                .button-group {
                    display: flex;
                    gap: 10px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                }
                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s;
                }
                #emergencyBtn {
                    background-color: #e74c3c;
                    color: white;
                    flex: 1;
                    min-width: 200px;
                }
                #emergencyBtn:hover {
                    background-color: #c0392b;
                }
                #printBtn {
                    background-color: #0066ff;
                    color: white;
                    flex: 1;
                    min-width: 200px;
                }       
                #printBtn:hover {
                    background-color: #ff6b00;
                }
                .recommendations {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 15px;
                }
                .recommendation-heading {
                    color: #0066ff;
                    margin: 20px 0 10px 0;
                    font-size: 1.2em;
                }
                .recommendation-heading strong {
                color: inherit;
                }
                .recommendation-heading strong {
                    color: inherit;
                }

                .recommendation-list {
                    list-style-type: none;
                    padding-left: 20px;
                    margin: 10px 0;
                }

                .numbered-item {
                    counter-increment: item;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 25px;
                }

                .numbered-item::before {
                    content: counter(item) ".";
                    position: absolute;
                    left: 0;
                    color: #0066ff;
                    font-weight: bold;
                }

                .bullet-item {
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 20px;
                }

                .bullet-item::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: #0066ff;
                }

                .recommendation-paragraph {
                    margin-bottom: 12px;
                }
                @media print {
                    .no-print {
                        display: none;
                    }
                    body {
                        padding: 0;
                        font-size: 12pt;
                    }
                    .section {
                    border-bottom: none;
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="section">
                <h1 class="section-title">Medical Profile</h1>
                <div class="section-content">
            
                    <p><strong>Name:</strong> ${profile.name || 'N/A'}</p>
                    <p><strong>Medical History/Condition:</strong> ${profile.medicalHistory || 'N/A'}</p>
                    <p><strong>Allergies:</strong> ${profile.allergies || 'N/A'}</p>
                    <p><strong>Medications:</strong> ${profile.medications || 'N/A'}</p>
                    <p><strong>Emergency Contact:</strong> ${profile.emergencyContact || 'N/A'}</p>
                    <p><strong>Emergency Contact Phone:</strong> ${profile.emergencyPhone || 'N/A'}</p>
             
                    </div>
            </div>
            <div class="section">
                <h2 class="section-title">Emergency First Aid Instructions</h2>
                <div class="section-content">
                    <div class="recommendations">
                        <ul>${formattedRecommendations}</ul>
                    </div>    
                </div>
            </div>
            
            <div class="button-group no-print">
                <button id="emergencyBtn">Send Emergency Alert</button>
                <button id="printBtn">Print This Page</button>
            </div>
            
            <script>

            const serverIP = "${serverIP}";

            // Collapsible sections functionality
            document.querySelectorAll('.section-title').forEach(title => {
                title.addEventListener('click', () => {
                    const content = title.nextElementSibling;
                    title.classList.toggle('collapsed');
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                });
            
                // Initialize all sections as expanded
                title.nextElementSibling.style.display = 'block';
            });

            // Print functionality
            document.getElementById('printBtn').addEventListener('click', () => {
                window.print();
            });

            const sendEmergencyMessage = async (latitude,longitude) => {
            try {
               
                // Extract the emergency contact number
                const emergencyContact = "${profile.emergencyPhone}"; // Assuming this is a phone number
                const profileName = "${profile.name}"
                const message = \`Emergency Alert: \${profileName} needs assistance! \${latitude && longitude ? 
                            \`Here is their location: https://www.google.com/maps?q=\${latitude},\${longitude}\` : 
                            'Location unavailable'}\`;

                // Send the SMS using your backend API
                const smsResponse = await fetch('${serverIP}/api/send-sms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: emergencyContact,
                        body: message,
                        latitude: latitude || null, 
                        longitude: longitude || null
                    }),
                });

                const responseData = await smsResponse.json();

                if (!smsResponse.ok) {
                    throw new Error(responseData.message || 'Failed to send SMS');
                }

                console.log("Message sent successfully");
                alert("Emergency message sent to " + emergencyContact);
            } catch (error) {
                console.error("Error sending message:", error);
                alert("Failed to send emergency message: " + error.message);
            }
        };

        const getLocationAndSendMessage = () => {
        if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            async (position) => {
                                try {
                                    await sendEmergencyMessage(
                                        position.coords.latitude, 
                                        position.coords.longitude
                                    );
                                } catch (error) {
                                    console.error("Error:", error);
                                }
                            },
                            (error) => {
                                console.error("Location error:", error);
                                if (confirm("Unable to get your location. Send emergency message without location?"+ error.message)) {
                                    sendEmergencyMessage(null, null);
                                }
                            },
                            { timeout: 10000, enableHighAccuracy: true }
                        );
                    } else {
                        if (confirm("Geolocation not supported. Send emergency message without location?")) {
                            sendEmergencyMessage(null, null);
                        }
                    }
                };

       document.getElementById('emergencyBtn').addEventListener('click', () => {
                    if (confirm("Are you sure you want to send an emergency alert?")) {
                        getLocationAndSendMessage();
                    }
                });
       
    </script>
        </body>
        </html>
    `;
    } catch (error) {
        console.error('Error formatting medical profile:', error);
        throw error;
    }
};

exports.saveProfileHTML = async (htmlContent, userId) => {
    const dir = path.join(__dirname, '../public/profiles'); // Directory to store HTML files
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
    }
    const filePath = path.join(dir, `${userId}_profile.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    // console.log(filePath);
    // console.log(__dirname);


    return filePath;
};