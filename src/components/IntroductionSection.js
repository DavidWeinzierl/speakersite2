// src/components/IntroductionSection.js
import React from 'react';

const IntroductionSection = ({ about, experience }) => {
  return (
    <section id="about" className="section introduction-section">

<img src={process.env.PUBLIC_URL + "/images/speaker-headshot.png"} alt="Speaker Headshot" className="intro-headshot" />

      <div className="intro-text">
        <h2 className="section-title">About Me</h2>
        <p>{about}</p>
        <div className="intro-experience">
          <h3>Select Engagements & Experience</h3>
          <ul>
            {experience.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;