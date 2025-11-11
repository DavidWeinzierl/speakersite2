import React, { useState } from 'react';

const ContactSection = ({ email }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
          <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Lassen Sie uns zusammenarbeiten
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Haben Sie ein Projekt im Kopf? Nehmen Sie Kontakt auf und lassen Sie uns etwas Außergewöhnliches schaffen.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 transform hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nachricht senden</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ihr Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all duration-200 outline-none"
                  placeholder="Max Mustermann"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all duration-200 outline-none"
                  placeholder="max@beispiel.de"
                />
              </div>

              {/* Subject Field */}
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Betreff *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all duration-200 outline-none"
                  placeholder="Anfrage zum Projekt"
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ihre Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all duration-200 outline-none resize-none"
                  placeholder="Erzählen Sie mir von Ihrem Projekt..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Nachricht senden
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Nachricht erfolgreich gesendet!
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Speaker Image and Contact Info */}
          <div className="space-y-6">
            {/* Speaker Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[5/3] relative flex items-start justify-center">
                  {/* Image container smaller than wrapper so only the image scales down */}
                  <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={process.env.PUBLIC_URL + '/images/speaker1.png'}
                      alt="Professional Voice Actor"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ objectPosition: 'center 40%' }}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = process.env.PUBLIC_URL + '/images/speaker2.png'; }}
                    />
                  </div>
                  {/* Overlay gradient for better text visibility if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
                </div>
                {/* Optional decorative element */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Kontaktinformationen
              </h3>
              
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold opacity-90 mb-1">E-Mail</p>
                    <a href={`mailto:${email}`} className="text-lg font-medium hover:underline break-all">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold opacity-90 mb-1">Antwortzeit</p>
                    <p className="text-lg font-medium">Innerhalb von 24 Stunden</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold opacity-90 mb-1">Verfügbarkeit</p>
                    <p className="text-lg font-medium">Mo - Fr, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Call-to-action hint */}
              <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                <p className="text-sm opacity-90 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Ich freue mich darauf, von Ihrem Projekt zu hören!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
