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
            
            <div className="bg-white p-6 rounded-lg border border-light-border shadow-md">
              <h3 className="text-2xl font-semibold text-accent-500 mb-4">
                Select Projects & Experience
              </h3>
              <ul className="space-y-3">
                {experience.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-accent-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;