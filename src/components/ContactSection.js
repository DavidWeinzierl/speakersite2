import React from 'react';

const ContactSection = ({ email }) => {
  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Let's Connect</h2>
      <p>Ready to bring a dynamic and engaging voice to your next event? I'm available for keynotes, workshops, and voiceover projects. Let's create something memorable together.</p>
      <a href={`mailto:${email}`} className="contact-button">
        Contact for Booking
      </a>
    </section>
  );
};

export default ContactSection;