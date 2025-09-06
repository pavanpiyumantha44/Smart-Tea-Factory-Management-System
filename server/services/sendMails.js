import nodemailer from 'nodemailer';
import tls from 'tls';
import dotenv from "dotenv";
dotenv.config();


 const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
        rejectUnauthorized: false
        }
    });

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"CeylonTea Systems" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
