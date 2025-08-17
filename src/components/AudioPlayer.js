import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ title, description, file }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [waveformData, setWaveformData] = useState([]);
  const [isLoadingWaveform, setIsLoadingWaveform] = useState(true);

  // Generate waveform data from actual audio file
  const generateWaveform = async (audioBuffer) => {
    const samples = 40; // Number of waveform bars
    const channelData = audioBuffer.getChannelData(0); // Use first channel
    const blockSize = Math.floor(channelData.length / samples);
    const waveform = [];

    for (let i = 0; i < samples; i++) {
      const start = i * blockSize;
      const end = start + blockSize;
      let sum = 0;
      
      // Calculate RMS (Root Mean Square) for this block
      for (let j = start; j < end && j < channelData.length; j++) {
        sum += channelData[j] * channelData[j];
      }
      
      const rms = Math.sqrt(sum / blockSize);
      const normalizedValue = Math.min(1, rms * 4); // Amplify and normalize
      waveform.push(Math.max(0.1, normalizedValue)); // Ensure minimum height
    }
    
    return waveform;
  };

  // Load and analyze audio file for waveform
  const loadWaveform = async () => {
    try {
      setIsLoadingWaveform(true);
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const waveform = await generateWaveform(audioBuffer);
      setWaveformData(waveform);
      audioContext.close();
    } catch (error) {
      console.error('Error loading waveform:', error);
      // Fallback to generated waveform if loading fails
      const fallbackWaveform = Array.from({ length: 40 }, (_, i) => {
        const base = Math.sin(i * 0.3) * 0.5 + 0.5;
        const variation = Math.sin(i * 0.8) * 0.3;
        return Math.max(0.2, Math.min(1, base + variation));
      });
      setWaveformData(fallbackWaveform);
    } finally {
      setIsLoadingWaveform(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Load waveform when component mounts
    loadWaveform();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [file]); // Re-run when file changes

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
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
            <div className="h-16 flex items-center justify-center">
              <div className="text-sm text-gray-500">Loading waveform...</div>
            </div>
          ) : (
            <div 
              className="flex items-center justify-between h-16 cursor-pointer gap-px relative"
              onClick={handleWaveformClick}
            >
              {/* Center line for reference */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 transform -translate-y-1/2 z-0"></div>
              
              {waveformData.map((height, index) => {
                const progress = duration ? (currentTime / duration) : 0;
                const barProgress = progress * waveformData.length;
                const isActive = index < barProgress;
                const barHeight = height * 28; // Max height of 28px (14px up + 14px down from center)
                
                return (
                  <div key={index} className="flex-1 relative z-10 flex flex-col items-center justify-center h-full">
                    {/* Top half of waveform */}
                    <div
                      className={`w-full rounded-sm transition-all duration-150 ${
                        isActive 
                          ? 'bg-accent shadow-sm' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      style={{ 
                        height: `${barHeight}px`,
                        marginBottom: '1px'
                      }}
                    />
                    {/* Bottom half of waveform (mirrored) */}
                    <div
                      className={`w-full rounded-sm transition-all duration-150 ${
                        isActive 
                          ? 'bg-accent shadow-sm' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      style={{ 
                        height: `${barHeight}px`,
                        marginTop: '1px'
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
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
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
              className="w-20 h-2 rounded-lg appearance-none cursor-pointer accent-accent slider-visible"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center text-xs text-accent">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 106 0v-5a3 3 0 10-6 0v5z" />
        </svg>
        Professional Voice Sample
      </div>
    </div>
  );
};

export default AudioPlayer;