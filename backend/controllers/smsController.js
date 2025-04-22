const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

exports.sendSMS = async (req,res)=>{

    const { to, body, latitude, longitude} = req.body;

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    try {
        // const messageBody = `${body} Location: https://www.google.com/maps?q=${latitude},${longitude}`;
        await twilioClient.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: to, // Emergency contact's phone number
        });
        console.log("Message sent");
        res.status(200).send({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send({ error: "Failed to send message" });
    }

}