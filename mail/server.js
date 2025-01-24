import express from 'express';
import pkg from 'body-parser';
import cors from 'cors'; // Import the cors middleware
import { config } from 'dotenv';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Load environment variables from api.env
config({ path: './api.env' });

const { urlencoded, json } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(urlencoded({ extended: true }));
app.use(json());

const apiKey = process.env.API_KEY;
console.log('API Key:', apiKey); // Log the API key to verify it is loaded

const mailerSend = new MailerSend({
  apiKey: apiKey, // Ensure your API key is set in the api.env file
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message || !validateEmail(email)) {
        return res.status(400).json({ message: 'No arguments Provided!' });
    }

    const email_subject = `Dora Catering Contact: ${name}`;
    const email_body = `Ai primit un nou mesaj de contact.\n\nAici sunt detaliile:\n\nNume: ${name}\n\nEmail: ${email}\n\nMesaj:\n${message}`;

    const sentFrom = new Sender('noreply@trial-ynrw7gy7x8jg2k8e.mlsender.net', 'Dora Catering Test'); // Use the trial domain
    const recipients = [
        new Recipient('c_nicoleta00@yahoo.it', 'Admin')
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(email_subject)
        .setHtml(email_body)
        .setText(email_body);

    try {
        await mailerSend.email.send(emailParams);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}