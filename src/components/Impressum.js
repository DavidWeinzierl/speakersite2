import React from 'react';

const Impressum = () => {
  return (
    <main className="pt-20 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Impressum
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-2">
                <p><strong>Philipp Obermüller</strong></p>
                
                <p>Aubrunnerweg 41/42</p>
                <p>4040 Linz, Österreich</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kontakt
              </h2>
              <div className="space-y-2">
                <p><strong>E-Mail:</strong> philipp@philyourvoice.at</p>
                <p><strong>Telefon:</strong> +43 664 24 23 725</p>
              </div>
            </section>








            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Fotos
              </h2>
              <p className="text-sm leading-relaxed">
                Michael Kramer
              </p>
            </section>


            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Gestaltung und Programmierung
              </h2>
              <p className="text-sm leading-relaxed">
                David Weinzierl
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

export default Impressum;
