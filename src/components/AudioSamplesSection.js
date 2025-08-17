// src/components/AudioSamplesSection.js
import React from 'react';
import AudioPlayer from './AudioPlayer'; // Compact player for grid

const AudioSamplesSection = ({ samples }) => {
  // Use all samples for the compact audio player grid
  const defaultSamples = samples;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Hear My Voice
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Listen to samples of my voiceover work across different styles and industries
          </p>
        </div>
        
        {/* Audio samples grid - 8 small players in 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {defaultSamples.map((sample, index) => (
            <AudioPlayer key={index} title={sample.title} description={sample.description} file={sample.file} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudioSamplesSection;