import React from 'react';

const AudioPlayer = ({ title, description, file }) => {
  return (
    <div className="bg-dark-secondary p-6 rounded-lg border border-dark-border hover:border-accent-500 transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="relative">
        <audio 
          controls 
          src={file}
          className="w-full h-12 rounded-lg"
          style={{
            filter: 'invert(85%) sepia(10%) saturate(200%) hue-rotate(140deg) brightness(120%)',
          }}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="mt-4 flex items-center text-xs text-accent-500">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 106 0v-5a3 3 0 10-6 0v5z" />
        </svg>
        Professional Voice Sample
      </div>
    </div>
  );
};

export default AudioPlayer;