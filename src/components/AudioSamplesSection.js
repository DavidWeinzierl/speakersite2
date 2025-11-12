// src/components/AudioSamplesSection.js
import React from 'react';
import AudioPlayer from './AudioPlayer'; // Compact player for grid
import AudioPlayerWithLogo from './AudioPlayerWithLogo'; // Player with brand logo

const AudioSamplesSection = ({ samples, brands }) => {
  const firstFourSamples = samples.slice(0, 4);
  const secondFourSamples = samples.slice(4, 8);
  
  // Brand logos for the second row
  const brandLogos = [
    process.env.PUBLIC_URL + '/images/europlasma.png',
    process.env.PUBLIC_URL + '/images/ford.png',
    process.env.PUBLIC_URL + '/images/bellaflora.png',
    process.env.PUBLIC_URL + '/images/wieselburgermesse.png'
  ];

  // Brand logos for the third row (mapping provided)
  const brandLogosSecondRow = [
    process.env.PUBLIC_URL + '/images/salzburgAG.png',
    process.env.PUBLIC_URL + '/images/megaplexx.png',
    process.env.PUBLIC_URL + '/images/FHCS.png',
    process.env.PUBLIC_URL + '/images/jugendverschuldung.png'
  ];

  return (
    <>      
      {/* Audio Samples Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Hörproben
            </h2>
            
          </div>
          
          {/* Additional row using the new AudioPlayerWithLogo for first four samples */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
            {firstFourSamples.map((sample, index) => (
              <AudioPlayerWithLogo 
                key={`ap-logo-${index}`} 
                title={sample.title} 
                description={sample.description} 
                file={sample.file}
                logo={brandLogos[index]}
              />
            ))}
          </div>

          {/* Third row: new AudioPlayerWithLogo for second row of samples */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr mt-6">
            {secondFourSamples.map((sample, index) => (
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