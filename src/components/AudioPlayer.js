import React, { useRef, useState, useEffect } from 'react';
import { useAudioContext } from '../contexts/AudioContext';

const AudioPlayer = ({ title, description, file }) => {
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
  const generateNaturalWaveform = (seed = 0) => {
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
  };

  // Load and generate natural waveform
  const loadWaveform = () => {
    setIsLoadingWaveform(true);
    
    // Generate a natural-looking waveform based on the file path as seed
    // This ensures each audio file gets a consistent but unique waveform
    const seed = file.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const waveform = generateNaturalWaveform(seed);
    setWaveformData(waveform);
    setIsLoadingWaveform(false);
  };

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
  }, [file, playerId, registerAudio, unregisterAudio, stopAudio]); // Add dependencies

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
    <div className="bg-light-secondary p-6 rounded-lg border border-light-border hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
      
      <audio ref={audioRef} src={file} preload="metadata" />
      
      <div className="space-y-4">
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
                const barHeight = height * 40; // Total height of the waveform bar
                
                return (
                  <div key={index} className="flex-1 flex items-center justify-center h-full">
                    {/* Single continuous waveform bar */}
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

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
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
              className="w-20 h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 slider-visible"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;