// Simple Express server to handle contact form submissions
// Requires environment variables defined in a .env file.
// NEVER commit real credentials. Use .env (ignored) and .env.example for reference.

// Converted to CommonJS to avoid requiring "type": "module" in package.json
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic rate limit (naive) to mitigate abuse (in-memory, resets on restart)
const submissionCounts = new Map();
const MAX_PER_MINUTE = 5;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: 'Alle Felder sind erforderlich.' });
  }

  // Naive rate limiting by IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - 60_000;
  let entries = submissionCounts.get(ip) || [];
  entries = entries.filter(ts => ts > windowStart);
  if (entries.length >= MAX_PER_MINUTE) {
    return res.status(429).json({ ok: false, error: 'Zu viele Anfragen. Bitte warten Sie kurz.' });
  }
  entries.push(now);
  submissionCounts.set(ip, entries);

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const target = process.env.TARGET_EMAIL;
    if (!target) {
      return res.status(500).json({ ok: false, error: 'Server nicht konfiguriert (TARGET_EMAIL fehlt).' });
    }

    const mailOptions = {
      from: `Kontakt Formular <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: target,
      replyTo: email,
      subject: `${subject} - Nachricht von ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Nachricht:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error('E-Mail Versand Fehler:', err);
    return res.status(500).json({ ok: false, error: 'Versand fehlgeschlagen.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

const server = app.listen(PORT, () => {
  console.log(`Kontakt API läuft auf Port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} bereits belegt. Setzen Sie PORT in .env auf einen freien Port.`);
  } else {
    console.error('Server Fehler:', err);
  }
});

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
