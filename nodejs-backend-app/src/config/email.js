const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your email address
    pass: process.env.GMAIL_PASS, // Your app password
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(`Email sent: ${info.response}`);
    })
    .catch((error) => {
      console.error(`Error sending email: ${error.message}`);
    });
};

module.exports = { sendEmail };
