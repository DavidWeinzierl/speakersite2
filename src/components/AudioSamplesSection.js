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
    <section id="samples" className="section">
      <h2 className="section-title">Hear My Voice</h2>
      {/* Existing three players */}
      <div className="audio-samples-grid">
        {defaultSamples.map((sample, index) => (
          <AudioPlayer key={index} title={sample.title} description={sample.description} file={sample.file} />
        ))}
      </div>

      {/* New Waveform Player (below the grid) */}
      {waveformSamples.map((sample, index) => (
        <WaveformAudioPlayer key={`waveform-${index}`} title={sample.title} description={sample.description} file={sample.file} />
      ))}
    </section>
  );
};

export default AudioSamplesSection;