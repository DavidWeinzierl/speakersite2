// src/components/AudioSamplesSection.js
import React from 'react';
import AudioPlayer from './AudioPlayer'; // Compact player for grid

const AudioSamplesSection = ({ samples, brands }) => {
  // Use all samples for the compact audio player grid
  const defaultSamples = samples;

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
          
          {/* Audio samples grid - Single column on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
            {defaultSamples.map((sample, index) => (
              <AudioPlayer key={index} title={sample.title} description={sample.description} file={sample.file} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AudioSamplesSection;