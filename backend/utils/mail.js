import nodemailer from "nodemailer";

// Create a Nodemailer transporter using SMTP

export const sendMail = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });
  // Email message options
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to,
    subject,
    html,

  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
