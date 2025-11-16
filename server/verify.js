// Simple SMTP verify script (does not send email)
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log('SMTP verification succeeded. Ready to send.');
    process.exit(0);
  } catch (err) {
    console.error('SMTP verification failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

main();
