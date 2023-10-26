const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    // configure your mail server
  });

  await transporter.sendMail({
    from: "your-email@example.com",
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;