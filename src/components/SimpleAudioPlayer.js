// src/components/SimpleAudioPlayer.js
import React, { useRef, useState, useEffect } from 'react';

const SimpleAudioPlayer = ({ title, description, file }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  const drawWaveform = React.useCallback(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isPlaying) return;
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Create gradient for bars with blue colors
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#3b82f6aa');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
  }, [analyser, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => {
      setIsPlaying(true);
      if (analyser && canvasRef.current) {
        drawWaveform();
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    const handleError = () => setError('Failed to load audio file');

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Set up audio context for visualization
    if (!audioContext && audio) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const analyzerNode = ctx.createAnalyser();
        const source = ctx.createMediaElementSource(audio);
        
        analyzerNode.fftSize = 256;
        source.connect(analyzerNode);
        analyzerNode.connect(ctx.destination);
        
        setAudioContext(ctx);
        setAnalyser(analyzerNode);
      } catch (err) {
        console.log('Audio visualization not supported');
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioContext, analyser, drawWaveform]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Resume audio context if needed
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
      audio.play().catch(err => {
        console.error('Playback failed:', err);
        setError('Playback failed');
      });
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

  if (error) {
    return (
      <div className="bg-light-secondary p-8 rounded-xl border border-light-border shadow-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed mb-4">{description}</p>
        <div className="text-red-500 text-center py-8">
          <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-secondary p-8 rounded-xl border border-light-border hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed mb-6">{description}</p>
      
      <audio ref={audioRef} src={file} preload="metadata" crossOrigin="anonymous" />
      
      <div className="space-y-6">
        {/* Waveform Visualization */}
        <div className="relative bg-white rounded-lg p-4 h-32 border border-gray-200">
          <canvas 
            ref={canvasRef} 
            width="800" 
            height="100" 
            className="w-full h-full rounded"
            style={{ background: '#f8fafc' }}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 text-sm">Audio Visualization</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div 
            className="w-full h-3 bg-slate-300 rounded-full cursor-pointer hover:bg-slate-400 transition-colors"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-accent rounded-full transition-all duration-150 relative"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/30 shadow-xl hover:shadow-accent/30 hover:scale-105"
            >
              {isPlaying ? (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-24 h-2 rounded-lg appearance-none cursor-pointer accent-accent slider-visible"
            />
            <span className="text-gray-600 text-sm min-w-[3rem]">{Math.round(volume * 100)}%</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-accent border-t border-gray-300 pt-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          Premium Voice Sample with Live Visualization
        </div>
      </div>
    </div>
  );
};

export default SimpleAudioPlayer;
