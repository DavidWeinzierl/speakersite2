import React from 'react';

// Import Data
import { speakerData } from './data/content';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import AudioSamplesSection from './components/AudioSamplesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <HeroSection 
          name={speakerData.name} 
          tagline={speakerData.tagline} 
        />
        <div id="about">
          <IntroductionSection
            about={speakerData.about}
            experience={speakerData.experience}
          />
        </div>
        <div id="samples">
          <AudioSamplesSection 
            samples={speakerData.audioSamples} 
          />
        </div>
        <div id="testimonials">
          <TestimonialsSection 
            testimonials={speakerData.testimonials}
          />
        </div>
        <div id="contact">
          <ContactSection
            email={speakerData.email}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;