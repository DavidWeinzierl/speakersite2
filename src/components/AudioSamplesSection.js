// src/components/AudioSamplesSection.js
import React from 'react';
import AudioPlayerWithLogo from './AudioPlayerWithLogo'; // Player with brand logo

const AudioSamplesSection = ({ samples, brands }) => {
  // Limit to first 6 samples and split into two rows of 3
  const visibleSamples = samples.slice(0, 6);
  const firstThreeSamples = visibleSamples.slice(0, 3);
  const secondThreeSamples = visibleSamples.slice(3, 6);

  // Brand logos for the first row (3 items)
  const brandLogos = [
    process.env.PUBLIC_URL + '/images/europlasma.png',
    process.env.PUBLIC_URL + '/images/ford.png',
    process.env.PUBLIC_URL + '/images/bellaflora.png'
  ];

  // Brand logos for the second row (3 items) - Wieselburger Messe moved into row 2
  const brandLogosSecondRow = [
    process.env.PUBLIC_URL + '/images/wieselburgermesse.png',
    process.env.PUBLIC_URL + '/images/salzburgAG.png',
    process.env.PUBLIC_URL + '/images/megaplexx.png'
  ];

  return (
    <>      
      {/* Audio Samples Section */}
      <section className="py-20 px-6 bg-white">
        {/* increased container width so 3 columns are a bit wider (take space of previous 4) */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Hörproben
            </h2>
            
          </div>
          
          {/* First row: 3 columns on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {firstThreeSamples.map((sample, index) => (
              <AudioPlayerWithLogo 
                key={`ap-logo-${index}`} 
                title={sample.title} 
                description={sample.description} 
                file={sample.file}
                logo={brandLogos[index]}
              />
            ))}
          </div>

          {/* Second row: 3 columns on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr mt-6">
            {secondThreeSamples.map((sample, index) => (
              <AudioPlayerWithLogo 
                key={`ap-logo-2-${index}`} 
                title={sample.title} 
                description={sample.description} 
                file={sample.file}
                logo={brandLogosSecondRow[index]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AudioSamplesSection;