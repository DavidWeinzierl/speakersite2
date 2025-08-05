// src/components/WaveformAudioPlayer.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformAudioPlayer = ({ title, description, file }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ccc',
        progressColor: '#00f5c3',
        cursorColor: '#fff',
        barWidth: 3,
        barRadius: 3,
        height: 60, // Made waveform smaller
        responsive: true,
        hideScrollbar: true,
        backend: 'MediaElement',
        minPxPerSec: 1,
        volume: volume,
      });

      wavesurfer.current.load(file);

      wavesurfer.current.on('play', () => {
        setIsPlaying(true);
      });

      wavesurfer.current.on('pause', () => {
        setIsPlaying(false);
      });

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
        wavesurfer.current.seekTo(0);
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [file, volume]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVolume);
    }
  }, []);

  return (
    <div className="waveform-player-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="waveform-controls">
        <button onClick={handlePlayPause} className="waveform-play-button">
          {isPlaying ? '❚❚' : '▶'} {/* Changed content to just symbols */}
        </button>
        <div className="waveform-volume">
          {/* Removed <span>Volume:</span> label */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <div ref={waveformRef} className="waveform-container"></div> {/* Moved waveform container to the right */}
      </div>
    </div>
  );
};

export default WaveformAudioPlayer;