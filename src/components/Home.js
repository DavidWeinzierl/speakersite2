import React from 'react';
import HeroSection from './HeroSection';
import AboutMe2 from './AboutMe2';
import AudioSamplesSection from './AudioSamplesSection';
// import BrandCarousel from './BrandCarousel';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import { speakerData } from '../data/content';

const Home = () => {
  return (
    <>
      <HeroSection 
        name={speakerData.name} 
        tagline={speakerData.tagline} 
      />
      {/* Alternative About Me section with parallax image and bottom overlay */}
      <div id="aboutMe2">
        <AboutMe2 />
      </div>
  {/* <BrandCarousel brands={speakerData.brands} /> */}
      <div id="samples">
        <AudioSamplesSection 
          samples={speakerData.audioSamples}
          brands={speakerData.brands}
        />
      </div>

      <div id="testimonials">
        <ServicesSection 
          services={speakerData.services}
        />
      </div>
      
      {/* Alternative Services Section with Contact Style 
      <ServicesContactSection 
        services={speakerData.services}
        email={speakerData.email}
      />
      */}
      
      {/* Contact Section as the last section on the page */}
      <div id="contact">
        <ContactSection email={speakerData.email} />
      </div>
    </>
  );
};

export default Home;
