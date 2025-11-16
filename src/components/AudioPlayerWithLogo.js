import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAudioContext } from '../contexts/AudioContext';

const AudioPlayerWithLogo = ({ title, description, file, logo }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [waveformData, setWaveformData] = useState([]);
  const [isLoadingWaveform, setIsLoadingWaveform] = useState(false);
  
  // Use audio context for managing multiple players
  const { registerAudio, unregisterAudio, playAudio, stopAudio } = useAudioContext();
  
  // Create unique ID for this player
  const playerId = `${title}-${file}`.replace(/\s+/g, '-');

  // Generate a natural-looking random waveform pattern
  const generateNaturalWaveform = useCallback((seed = 0) => {
    const samples = 40;
    const waveform = [];
    
    // Use seed to make waveforms consistent for each audio file
    const random = (i) => {
      const x = Math.sin(seed + i * 0.1) * 1000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < samples; i++) {
      // Create more realistic audio waveform with increased variation
      const baseAmplitude = 0.6; // Reduced base level to allow more fluctuation
      const smoothWave = Math.sin(i * 0.15 + seed) * 0.35; // Increased variation
      const mediumWave = Math.sin(i * 0.4 + seed * 1.5) * 0.25; // Increased variation
      const detailWave = Math.sin(i * 0.8 + seed * 2) * 0.15; // Increased variation
      const subtleNoise = (random(i) - 0.5) * 0.1; // Increased randomness
      
      // Combine waves for realistic pattern
      let amplitude = baseAmplitude + smoothWave + mediumWave + detailWave + subtleNoise;
      
      // Add more dramatic emphasis points for greater variation
      if (i % 12 === 0 || i % 16 === 0) amplitude *= 1.6; // Stronger peaks
      if (i % 9 === 0) amplitude *= 0.6; // Deeper valleys
      if (i % 7 === 0) amplitude *= 1.3; // Additional variation points
      
      // Create some longer sections of varying amplitude
      const sectionModifier = Math.sin(i * 0.08 + seed) * 0.2; // Increased section variation
      amplitude += sectionModifier;
      
      // Normalize and ensure reasonable range with more dynamic spread
      amplitude = Math.max(0.3, Math.min(1.0, amplitude));
      waveform.push(amplitude);
    }
    
    // Light smoothing to preserve variation while removing harsh transitions
    for (let i = 1; i < waveform.length - 1; i++) {
      const prev = waveform[i - 1];
      const current = waveform[i];
      const next = waveform[i + 1];
      
      // Apply lighter smoothing to preserve more variation
      waveform[i] = (prev * 0.15 + current * 0.7 + next * 0.15);
    }
    
    return waveform;
  }, []);

  // Load and generate natural waveform
  const loadWaveform = useCallback(() => {
    setIsLoadingWaveform(true);

    // Generate a natural-looking waveform based on the file path as seed
    // This ensures each audio file gets a consistent but unique waveform
    const seed = file.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const waveform = generateNaturalWaveform(seed);
    setWaveformData(waveform);
    setIsLoadingWaveform(false);
  }, [file, generateNaturalWaveform]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Register this audio player with the context
    registerAudio(playerId, audioRef);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      stopAudio(playerId);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      stopAudio(playerId);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Generate waveform immediately when component mounts
    loadWaveform();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      
      // Unregister when component unmounts
      unregisterAudio(playerId);
    };
  }, [file, playerId, registerAudio, unregisterAudio, stopAudio, loadWaveform]); // Add dependencies

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Notify context that this player wants to play (will stop others)
      playAudio(playerId);
      audio.play();
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
  };

  const handleWaveformClick = (e) => {
    handleSeek(e);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-light-secondary p-4 md:p-6 rounded-lg border border-light-border hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg h-full flex flex-col relative overflow-hidden">
      {/* Brand Logo - firmly anchored to top-right; fade only toward left and bottom */}
      {logo && (
        // Use explicit inline sizes/offsets so Tailwind breakpoint overrides can't change placement
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -60, // pull higher into the corner
            right: -12,
            width: 164, // 72px (smaller logo)
            height: 164,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'visible'
          }}
        >
          <img
            src={logo}
            alt="Brand"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120%',
              height: '120%',
              objectFit: 'contain',
              opacity: 0.18,
              // Use a radial-ish composite mask to keep the top-right strong and drop off faster
              // Shift transparency earlier so fade starts sooner (visible area shorter)
              WebkitMaskImage:
                'radial-gradient(ellipse at 80% 3%, black 0%, black 55%, transparent 72%)',
              maskImage:
                'radial-gradient(ellipse at 80% 3%, black 0%, black 55%, transparent 72%)',
              WebkitMaskSize: '120% 120%',
              maskSize: '120% 120%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat'
            }}
          />
        </div>
      )}
      
      {/* Content with z-index to stay above logo */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title and Description */}
        <div className="mb-3 md:mb-4 flex-shrink-0">
          {/* Mobile: Same line layout */}
          <div className="md:hidden flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{title}</h3>
            <p className="text-gray-700 text-sm flex-shrink-0">{description}</p>
          </div>
          {/* Desktop: Stacked layout */}
          <div className="hidden md:block">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        
        <audio ref={audioRef} src={file} preload="metadata" />
        
        {/* Mobile: Horizontal Layout, Desktop: Vertical Layout */}
        <div className="flex-grow flex flex-col justify-end">
          
          {/* Desktop Layout: Waveform first, then controls */}
          <div className="hidden md:block space-y-4">
            {/* Waveform Progress */}
            <div className="relative">
              {isLoadingWaveform ? (
                // Loading state
                <div className="h-12 flex items-center justify-center">
                  <div className="text-sm text-gray-500">Loading waveform...</div>
                </div>
              ) : (
                <div 
                  className="flex items-center justify-center h-12 cursor-pointer gap-px relative"
                  onClick={handleWaveformClick}
                >
                  {waveformData.map((height, index) => {
                    const progress = duration ? (currentTime / duration) : 0;
                    const barProgress = progress * waveformData.length;
                    const isActive = index < barProgress;
                    const barHeight = height * 40;
                    
                    return (
                      <div key={index} className="flex-1 flex items-center justify-center h-full">
                        <div
                          className={`w-full rounded-sm transition-all duration-150 ${
                            isActive 
                              ? 'bg-gray-400 shadow-sm' 
                              : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                          style={{ 
                            height: `${barHeight}px`,
                            minHeight: '4px'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="flex items-center justify-between space-x-3 md:space-x-0">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex-shrink-0"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{ 
                    background: '#cbd5e1',
                    height: '8px'
                  }}
                  className="w-16 md:w-20 h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 slider-visible"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout: Horizontal arrangement */}
          <div className="md:hidden">
            <div className="flex items-center gap-4">
              {/* Left side: Play button and volume slider */}
              <div className="flex flex-col items-center space-y-3 flex-shrink-0">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ 
                      background: '#cbd5e1',
                      height: '6px'
                    }}
                    className="w-16 h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-500 slider-visible"
                  />
                </div>
              </div>

              {/* Right side: Waveform */}
              <div className="flex-1 min-w-0">
                {isLoadingWaveform ? (
                  <div className="h-16 flex items-center justify-center">
                    <div className="text-xs text-gray-500">Loading...</div>
                  </div>
                ) : (
                  <div 
                    className="flex items-center justify-center h-16 cursor-pointer gap-px relative"
                    onClick={handleWaveformClick}
                  >
                    {waveformData.map((height, index) => {
                      const progress = duration ? (currentTime / duration) : 0;
                      const barProgress = progress * waveformData.length;
                      const isActive = index < barProgress;
                      const barHeight = height * 48; // Doubled from 24 to 48 for mobile
                      
                      return (
                        <div key={index} className="flex-1 flex items-center justify-center h-full">
                          <div
                            className={`w-full rounded-sm transition-all duration-150 ${
                              isActive 
                                ? 'bg-gray-400 shadow-sm' 
                                : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                            style={{ 
                              height: `${barHeight}px`,
                              minHeight: '3px'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerWithLogo;
