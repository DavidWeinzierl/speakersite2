// src/components/waveformaudioplayerImage.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformAudioPlayer = ({ title, description, file }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    // Cleanup previous instance
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
      wavesurfer.current = null;
    }

    if (waveformRef.current && mounted) {
      try {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#e5e7eb',
          progressColor: '#eab308',
          cursorColor: '#374151',
          barWidth: 3,
          barRadius: 3,
          height: 60,
          responsive: true,
          hideScrollbar: true,
          backend: 'MediaElement',
          minPxPerSec: 1,
          volume: volume,
        });

        wavesurfer.current.on('ready', () => {
          if (mounted) {
            setIsLoading(false);
            setError(null);
          }
        });

        wavesurfer.current.on('error', (err) => {
          if (mounted) {
            setError('Failed to load audio file');
            setIsLoading(false);
            console.error('WaveSurfer error:', err);
          }
        });

        wavesurfer.current.on('play', () => {
          if (mounted) setIsPlaying(true);
        });

        wavesurfer.current.on('pause', () => {
          if (mounted) setIsPlaying(false);
        });

        wavesurfer.current.on('finish', () => {
          if (mounted) {
            setIsPlaying(false);
            wavesurfer.current?.seekTo(0);
          }
        });

        // Load the audio file
        if (file) {
          wavesurfer.current.load(file);
        }

      } catch (err) {
        if (mounted) {
          setError('Failed to initialize audio player');
          setIsLoading(false);
          console.error('WaveSurfer initialization error:', err);
        }
      }
    }

    return () => {
      mounted = false;
      if (wavesurfer.current) {
        try {
          wavesurfer.current.destroy();
        } catch (err) {
          console.error('Error destroying WaveSurfer:', err);
        }
        wavesurfer.current = null;
      }
    };
  }, [file, volume]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer.current && !isLoading && !error) {
      try {
        wavesurfer.current.playPause();
      } catch (err) {
        console.error('Error toggling play/pause:', err);
        setError('Playback error occurred');
      }
    }
  }, [isLoading, error]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current && !error) {
      try {
        wavesurfer.current.setVolume(newVolume);
      } catch (err) {
        console.error('Error setting volume:', err);
      }
    }
  }, [error]);

  if (error) {
    return (
      <div className="bg-dark-secondary p-6 rounded-lg border border-dark-border">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="text-red-400 text-center py-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-secondary p-6 rounded-lg border border-dark-border">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
      
      {isLoading && (
        <div className="text-gray-400 text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
          Loading audio...
        </div>
      )}
      
      <div className="flex items-center space-x-4" style={{ display: isLoading ? 'none' : 'flex' }}>
        <button 
          onClick={handlePlayPause} 
          disabled={isLoading || error}
          className="flex-shrink-0 w-12 h-12 bg-accent hover:bg-accent/80 disabled:bg-gray-600 text-dark-primary rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <div ref={waveformRef} className="waveform-container bg-dark-primary rounded p-2"></div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            disabled={isLoading || error}
            className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default WaveformAudioPlayer;
