import React from 'react';
import './App.css';

// Import Data
import { speakerData } from './data/content';

// Import Components
import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import AudioSamplesSection from './components/AudioSamplesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';


function App() {
  return (
    <div className="App">
      <main>
        <HeroSection 
          name={speakerData.name} 
          tagline={speakerData.tagline} 
        />
        <IntroductionSection
          about={speakerData.about}
          experience={speakerData.experience}
        />
        <AudioSamplesSection 
          samples={speakerData.audioSamples} 
        />
        <TestimonialsSection 
          testimonials={speakerData.testimonials}
        />
        <ContactSection
          email={speakerData.email}
        />
      </main>
    </div>
  );
}

export default App;