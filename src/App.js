import React from 'react';
import CookieConsent from "react-cookie-consent";

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

// Import Context
import { AudioProvider } from './contexts/AudioContext';


function App() {
  return (
    <AudioProvider>
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
            brands={speakerData.brands}
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
      
      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Akzeptieren"
        declineButtonText="Ablehnen"
        enableDeclineButton
        cookieName="philvoyvoiceCookieConsent"
        style={{
          background: "#1f2937",
          fontSize: "16px",
          padding: "1px",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-end",
          gap: "20px"
        }}
        buttonStyle={{
          background: "#3b82f6",
          color: "white",
          fontSize: "14px",
          borderRadius: "6px",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "25px"
        }}
        declineButtonStyle={{
          background: "#6b7280",
          color: "white",
          fontSize: "14px",
          borderRadius: "6px",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
          marginBottom: "25px"
        }}
        expires={365}
        overlay
        onAccept={() => {
          console.log("Cookies accepted");
        }}
        onDecline={() => {
          console.log("Cookies declined");
        }}
      >
        <div style={{ flex: 1 }}>
          <strong>Cookie-Hinweis</strong>
          <p style={{ marginTop: "5px", marginBottom: "5px" }}>
            Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. 
            Durch die weitere Nutzung der Website stimmen Sie der Verwendung von Cookies zu.{" "}
            
          </p>
        </div>
      </CookieConsent>
    </div>
    </AudioProvider>
  );
}

export default App;