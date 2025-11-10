import React from 'react';
import HeroSection from './HeroSection';
import IntroductionSection from './IntroductionSection';
import AudioSamplesSection from './AudioSamplesSection';
// import BrandCarousel from './BrandCarousel';
import ServicesSection from './ServicesSection';
import ServicesContactSection from './ServicesContactSection';
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
      
      {/* Alternative Services Section with Contact Style */}
      <ServicesContactSection 
        services={speakerData.services}
        email={speakerData.email}
      />
      

    </>
  );
};

export default Home;
