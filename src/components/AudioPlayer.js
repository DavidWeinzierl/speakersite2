import React from 'react';

const AudioPlayer = ({ title, description, file }) => {
  return (
    <div className="audio-player">
      <h3>{title}</h3>
      <p>{description}</p>
      <audio controls src={file}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;