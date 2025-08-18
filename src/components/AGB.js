import React from 'react';

const AGB = () => {
  return (
    <main className="pt-20 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Geltungsbereich
              </h2>
              <p className="text-sm leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Philipp Obermüller 
                (nachfolgend "Auftragnehmer") und dem Kunden über die Erbringung von Sprecherdiensten und 
                verwandten Dienstleistungen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Vertragsschluss
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Ein Vertrag kommt durch die schriftliche Bestätigung des Auftrags durch den Auftragnehmer zustande. 
                Mündliche Nebenabreden sind nur wirksam, wenn sie schriftlich bestätigt werden.
              </p>
              <p className="text-sm leading-relaxed">
                Der Auftragnehmer behält sich vor, Aufträge ohne Angabe von Gründen abzulehnen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Leistungsumfang
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                3.1 Sprecherleistungen
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Der Auftragnehmer erbringt professionelle Sprecherleistungen nach den vereinbarten Spezifikationen. 
                Dies umfasst:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
                <li>Werbespots für Radio und Television</li>
                <li>Unternehmensnarration</li>
                <li>Dokumentarfilm-Sprecher</li>
                <li>Hörbuch-Narration</li>
                <li>E-Learning Content</li>
                <li>Podcast-Intros und -Outros</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                3.2 Technische Spezifikationen
              </h3>
              <p className="text-sm leading-relaxed">
                Die Aufnahmen werden in professioneller Studioqualität erstellt. Standard-Lieferformat ist 
                44.1 kHz/24 Bit WAV, andere Formate nach Absprache.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Honorar und Zahlungsbedingungen
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                4.1 Honorarberechnung
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Das Honorar richtet sich nach dem vereinbarten Tarif. Maßgeblich sind die zum Zeitpunkt der 
                Auftragsbestätigung gültigen Preise.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                4.2 Zahlungsmodalitäten
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Zahlung innerhalb von 14 Tagen nach Rechnungsstellung</li>
                <li>Bei Projekten über EUR 1.000,- ist eine Anzahlung von 50% fällig</li>
                <li>Mahnspesen und Verzugszinsen nach gesetzlichen Bestimmungen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Lieferung und Lieferfristen
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Die Lieferung erfolgt digital via E-Mail oder Cloud-Service. Lieferfristen sind unverbindlich, 
                es sei denn, sie wurden ausdrücklich als verbindlich vereinbart.
              </p>
              <p className="text-sm leading-relaxed">
                Bei Verzögerungen durch höhere Gewalt oder durch den Kunden ist der Auftragnehmer von der 
                Leistungspflicht befreit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Nutzungsrechte und Urheberrecht
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                6.1 Rechteeinräumung
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Der Kunde erhält die vereinbarten Nutzungsrechte erst nach vollständiger Bezahlung der Rechnung. 
                Die Rechte sind auf den vereinbarten Verwendungszweck, Zeitraum und das vereinbarte Gebiet beschränkt.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                6.2 Urheberrecht
              </h3>
              <p className="text-sm leading-relaxed">
                Der Auftragnehmer behält alle nicht ausdrücklich übertragenen Rechte. Eine Weitergabe der 
                Aufnahmen an Dritte oder eine über den vereinbarten Zweck hinausgehende Nutzung ist untersagt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Gewährleistung und Haftung
              </h2>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                7.1 Gewährleistung
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                Der Auftragnehmer gewährleistet die vertragsgemäße Erbringung der Leistung. Bei Mängeln ist 
                zunächst Nachbesserung geschuldet.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                7.2 Haftungsbeschränkung
              </h3>
              <p className="text-sm leading-relaxed">
                Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Bei leichter Fahrlässigkeit 
                haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Datenschutz
              </h2>
              <p className="text-sm leading-relaxed">
                Der Auftragnehmer verpflichtet sich, alle im Rahmen der Geschäftsbeziehung bekannt gewordenen 
                Daten vertraulich zu behandeln und die geltenden Datenschutzbestimmungen einzuhalten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Schlussbestimmungen
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Wien.
              </p>
              <p className="text-sm leading-relaxed">
                Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit des übrigen Vertrages 
                unberührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem gewollten 
                Zweck am nächsten kommt.
              </p>
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

export default AGB;
