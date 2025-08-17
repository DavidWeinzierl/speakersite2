import React from 'react';

const HeroSection = ({ name, tagline }) => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center text-white">
      {/* Background with lighter overlay for better contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${process.env.PUBLIC_URL}/images/hero-background.jpg')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
          {name}
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-200 mb-8">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#samples" 
            className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 transform hover:scale-105"
          >
            Listen to Samples
          </a>
          <a 
            href="#contact" 
            className="border-2 border-accent-500 text-accent-500 px-8 py-4 rounded-lg font-semibold hover:bg-accent-500 hover:text-gray-900 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;