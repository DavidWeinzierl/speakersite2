import React from 'react';
import HeroSection from './HeroSection';
import IntroductionSection from './IntroductionSection';
import AudioSamplesSection from './AudioSamplesSection';
import BrandCarousel from './BrandCarousel';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import { speakerData } from '../data/content';

const Home = () => {
  return (
    <>
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
          brands={speakerData.brands}
        />
      </div>
      <BrandCarousel brands={speakerData.brands} />
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
    </>
  );
};

export default Home;
