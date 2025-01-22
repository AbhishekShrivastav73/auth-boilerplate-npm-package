const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const createTransporter = (config) => {
    return nodemailer.createTransport({
        service: config.service || 'gmail', // Default is Gmail, you can change it
        auth: {
            user: config.user,  // Sender email
            pass: config.pass   // Sender email password or app password
        }
    });
};

// Function to send email
const sendEmail = (to, subject, text, html, config) => {
    const transporter = createTransporter(config);
    
    const mailOptions = {
        from: config.user,   // Sender email
        to: to,              // Receiver email
        subject: subject,    // Email subject
        text: text,          // Plain text body
        html: html           // HTML formatted body (optional)
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = { sendEmail };
