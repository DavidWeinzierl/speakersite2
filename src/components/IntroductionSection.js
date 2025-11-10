// src/components/IntroductionSection.js
import React from 'react';

const IntroductionSection = ({ about, experience }) => {
  return (
    <section className="py-20 px-6 bg-light-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <img 
              src={process.env.PUBLIC_URL + "/images/speaker-headshot.png"} 
              alt="Philipp Obermüller - Professional Voice Talent" 
              className="w-80 h-auto rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {about}
            </p>
            
            {/* Box with projects/experience removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;