// src/components/AudioSamplesSection.js
import React from 'react';
import AudioPlayer from './AudioPlayer'; // Your existing simple player
import WaveformAudioPlayer from './WaveformAudioPlayer'; // Your new waveform player

const AudioSamplesSection = ({ samples }) => {
  // Filter samples that explicitly have a 'waveform' type
  const waveformSamples = samples.filter(sample => sample.type === 'waveform');
  // Filter samples for the default audio player (those without a 'waveform' type)
  const defaultSamples = samples.filter(sample => sample.type !== 'waveform');

  return (
    <section className="py-20 px-6 bg-dark-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Hear My Voice
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Listen to samples of my voiceover work across different styles and industries
          </p>
        </div>
        
        {/* Audio samples grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {defaultSamples.map((sample, index) => (
            <AudioPlayer key={index} title={sample.title} description={sample.description} file={sample.file} />
          ))}
        </div>

        {/* Waveform players */}
        <div className="space-y-8">
          {waveformSamples.map((sample, index) => (
            <WaveformAudioPlayer key={`waveform-${index}`} title={sample.title} description={sample.description} file={sample.file} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudioSamplesSection;