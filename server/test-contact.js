#!/usr/bin/env node
// Simple test script to POST a sample message to the contact endpoint.
// Usage: NODE_ENV=development node server/test-contact.js
// Optionally set API_BASE to override (e.g. https://your-domain.tld)

const fetch = global.fetch; // Node 18+ has fetch

const API_BASE = process.env.API_BASE || process.env.REACT_APP_API_BASE || '';
const endpoint = `${API_BASE}/api/contact`.replace(/\/\/$/, '/');

(async () => {
  try {
    const payload = {
      name: 'Test User',
      email: 'tester@example.com',
      subject: 'Automatischer Test',
      message: 'Dies ist eine automatisierte Testnachricht.'
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Fehlerhafte Antwort', res.status, data);
      process.exit(1);
    }
    if (!data.ok) {
      console.error('API meldet Fehler:', data);
      process.exit(2);
    }
    console.log('Kontakt-Endpunkt erfolgreich getestet. Antwort:', data);
    process.exit(0);
  } catch (err) {
    console.error('Test fehlgeschlagen:', err);
    process.exit(3);
  }
})();
