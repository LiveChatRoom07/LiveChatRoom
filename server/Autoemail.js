const nodemailer = require('nodemailer');

// Email service setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'talkies0308@gmail.com',
    pass: 'rntl vwmp rgnf akzp'
  }
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: 'talkies0308@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

module.exports = { sendEmail };