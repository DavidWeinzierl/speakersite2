import React from 'react';

const HeroSection = ({ name, tagline }) => {
  return (
    <section className="hero-section">
      <h1 className="hero-name">{name}</h1>
      <p className="hero-tagline">{tagline}</p>
    </section>
  );
};

export default HeroSection;