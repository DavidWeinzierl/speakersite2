import React, { createContext, useContext, useState, useRef } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRefs = useRef(new Map());

  const registerAudio = (id, audioRef) => {
    audioRefs.current.set(id, audioRef);
  };

  const unregisterAudio = (id) => {
    audioRefs.current.delete(id);
  };

  const playAudio = (id) => {
    // Stop all other audio players
    audioRefs.current.forEach((audioRef, playerId) => {
      if (playerId !== id && audioRef.current) {
        audioRef.current.pause();
      }
    });
    
    setCurrentlyPlaying(id);
  };

  const stopAudio = (id) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    }
  };

  const value = {
    currentlyPlaying,
    registerAudio,
    unregisterAudio,
    playAudio,
    stopAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
