import React from 'react';

const Datenschutz = () => {
  return (
    <main className="pt-20 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Allgemeine Hinweise
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                denen Sie persönlich identifiziert werden können.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Datenerfassung auf dieser Website
              </h3>
              <p className="text-sm leading-relaxed">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Hosting und Content Delivery Networks (CDN)
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                GitHub Pages
              </h3>
              <p className="text-sm leading-relaxed">
                Diese Website wird über GitHub Pages gehostet. Anbieter ist GitHub Inc., 88 Colin P Kelly Jr St, 
                San Francisco, CA 94107, USA. GitHub erhebt automatisch verschiedene Arten von Informationen über 
                Ihre Nutzung der GitHub Pages-Dienste, einschließlich Informationen über Ihren Besuch auf 
                unserer Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Datenschutz
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
                Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften 
                sowie dieser Datenschutzerklärung.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-white p-4 rounded border text-sm">
                <p><strong>Philipp Obermüller</strong></p>
                <p>Musterstraße 123</p>
                <p>1010 Wien, Österreich</p>
                <p>E-Mail: philipp.obermuller@example.com</p>
                <p>Telefon: +43 1 234 5678</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Datenerfassung auf dieser Website
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Cookies
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner 
                keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, 
                effektiver und sicherer zu machen.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Server-Log-Dateien
              </h3>
              <p className="text-sm leading-relaxed">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Kontaktformular
              </h2>
              <p className="text-sm leading-relaxed">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus 
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
                Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Ihre Rechte
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>unrichtige oder unvollständige Daten berichtigen oder vervollständigen zu lassen</li>
                <li>unverzüglich die Löschung Ihrer gespeicherten Daten zu verlangen</li>
                <li>die Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>ein kostenloses Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Stand: {new Date().toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Datenschutz;
