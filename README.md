#  ElderlyCare – AI-Powered Senior Health Management Platform

ElderlyCare is a full-stack MERN web application designed to assist senior citizens, caregivers, and medical responders by providing AI-powered health suggestions, real-time emergency support, and smart medical profile management.

This platform enhances the quality of life for elderly individuals by ensuring timely medical intervention, instant access to critical information, and proactive personalized care.

---

##  Features Overview

###  **Smart Medical Profiles**
- Secure storage of medical history, allergies, medications, and emergency contacts.
- Auto-generated patient profiles for quick access.
- Easy updates with authenticated access.

###  **QR Code Emergency System**
- Unique QR code for each patient.
- Scanning the QR code reveals vital health details.
- Auto-send location alerts to caregivers during emergencies.

###  **AI-Powered Health Intelligence**
- Personalized diet & lifestyle recommendations.
- First-aid instructions based on medical conditions.
- Proactive health suggestions (AI-assisted).

###  **Real-Time Emergency Support**
- Live GPS location tracking.
- SMS and Email alerts using Twilio & SendGrid.
- Quick response coordination for caregivers and medical staff.

---

##  Technology Stack

### **Frontend**
- React.js
- Tailwind CSS
- QR Scanner Library

### **Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

### **Third-Party Integrations**
- Twilio (SMS)
- SendGrid (Email)
- Ngrok (for secure tunneling during development)

### **Developer Tools**
- Git & GitHub
- VS Code
- Postman
- MongoDB Atlas

---

##  Installation & Setup

### **Prerequisites**
Make sure you have:

- Node.js (v16+)
- MongoDB Atlas account
- Twilio account
- SendGrid account

---

##  Backend Setup

Navigate to the backend folder:
```
cd backend
npm install
```
Create a .env file inside /backend:
```bash
# Database
MONGO_URI="your_mongodb_connection_string"

# JWT Authentication
JWT_SECRET="your_secure_jwt_secret"

# Twilio SMS
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
TWILIO_PHONE_NUMBER="+1234567890"

# SendGrid Email
SENDGRID_API_KEY="your_sendgrid_api_key"
SENDGRID_FROM_EMAIL="noreply@elderlycare.com"

# HuggingFace AI API
HF_API_KEY="your_api_key"

RENDER_BACKEND_URL="https://example.onrender.com"

```


Start backend:
```
npm start
```
##  Frontend Setup

Navigate to the frontend:
```
cd frontend
npm install
```
Create a .env file inside /frontend:
```
BACKEND_URI = "http://localhost:5000"

```
Start frontend:
```
npm start
```

 Access the App

Frontend running on port 3000

Backend running on port 5000
