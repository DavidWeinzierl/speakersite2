# SpeakerSite2

## Kontaktformular (Direkter Versand ohne Mail-Programm)

Das bisherige Formular nutzte einen `mailto:` Link und öffnete das lokale Mail-Programm. Jetzt gibt es einen Server-Endpunkt (`POST /api/contact`), der E-Mails direkt an `philipp@philyourvoice.at` (konfigurierbar) versendet.

### Wichtiger Hinweis zu GitHub Pages
GitHub Pages ist rein statisch und kann den neuen Express Server nicht ausführen. Optionen:
1. Deployment zu einem Anbieter mit Serverless/Node (z.B. Vercel, Netlify, Render, Fly.io).
2. Beibehalten von GitHub Pages für das Frontend und Deployment des Servers auf einem separaten Host; das Frontend spricht dann dessen URL (Proxy entfernen und statt `/api/contact` absolute URL verwenden z.B. `https://api.deine-domain.tld/api/contact`).
3. Alternative ohne eigenen Server: Dienste wie EmailJS, Formspree, Resend, SendGrid (Client-Integration). Diese erfordern API-Keys – niemals im Repository im Klartext committen.

### Einrichtung für lokalen Versand
1. Kopiere `.env.example` nach `.env` und trage echte SMTP Zugangsdaten ein.
2. Installiere Abhängigkeiten (falls noch nicht): `npm install`.
3. Starte Entwicklungsumgebung mit Backend: `npm run dev` (startet React + Express).
4. Teste das Formular: Ausfüllen und absenden – Erfolgs-/Fehlerstatus wird angezeigt.

Erforderliche Variablen in `.env`:
```
SMTP_HOST=dein.smtp.host
SMTP_PORT=587
SMTP_SECURE=false            # true falls Port 465 verwendet wird
SMTP_USER=dein_smtp_user
SMTP_PASS=dein_smtp_passwort
SMTP_FROM=no-reply@deine-domain.tld  # optional
TARGET_EMAIL=philipp@philyourvoice.at
PORT=5000
```

### Sicherheit & DSGVO
- Lege `.env` in `.gitignore` (Standard bei Create React App) – keine Credentials committen.
- Aktiviere SPF, DKIM & DMARC für deine Domain, sonst landen Mails evtl. im Spam.
- Füge ein Captcha / Rate Limiting für Produktion hinzu (naives Rate Limit ist bereits eingebaut).
- Logging von personenbezogenen Daten vermeiden oder nur kurzlebig halten.

### Fehlerbehebung
- "Server nicht konfiguriert" → `TARGET_EMAIL` fehlt.
- Auth Fehler → SMTP User/Pass oder Host/Port prüfen; ggf. TLS (`SMTP_SECURE=true`).
- Keine Antwort im Formular → Browser DevTools Netzwerkanfragen prüfen (CORS / 404 / 500).

### Produktion
Empfohlen (ein Host, eine Domain): Frontend + API vom Node-Server ausliefern.

Schnellstart auf einem Node‑fähigen Webspace (SSH):

1) Environment Variablen setzen (nicht committen). Auf dem Server in der Shell oder in einer `.env` Datei:
```
SMTP_HOST=smtp.world4you.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailbox@philyourvoice.at
SMTP_PASS=your-password
TARGET_EMAIL=philipp@philyourvoice.at
SMTP_FROM=Kontakt Formular <your-mailbox@philyourvoice.at>
PORT=5000
SERVE_STATIC=true
```

2) Build & Start (einmalig testen):
```
npm ci
npm run build
NODE_ENV=production SERVE_STATIC=true node server/index.js
```

3) Dauerhaft betreiben (PM2):
```
npm i -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # optional, damit PM2 beim Reboot startet
```

4) Optional: Reverse Proxy (Nginx/Apache) vor den Node‑Port setzen und TLS terminieren. Beispiel Nginx:
```
server {
	listen 80;
	server_name your-domain.tld www.your-domain.tld;
	location / {
		proxy_pass http://127.0.0.1:5000;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Hinweise zu Absender/Reply‑To:
- Verwende als SMTP‑Konto eine Mailbox deiner Domain, z.B. `no-reply@philyourvoice.at` oder `website@philyourvoice.at`.
- Setze `from` auf diese Adresse (oder `SMTP_FROM`).
- Setze `replyTo` auf die Adresse des Formular‑Absenders (bereits implementiert), damit du im Mail‑Client direkt antworten kannst.
- Spoofing (From=Besucheradresse) führt bei DMARC/ SPF oft zu Zustellproblemen – nicht empfohlen.

Alternative: Serverless Deployment (Vercel/Netlify/Render): `server/index.js` als Function adaptieren und Env Vars im Anbieter setzen.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
