import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light-secondary text-gray-900 py-12 px-6 border-t border-light-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-accent-500 mb-4">
              Philipp Obermüller
            </h3>
            <p className="text-gray-700 mb-4">

            Professionelle Sprecherstimme, spezialisiert für Werbung, Telefonschleifen, Hörbücher, Podcasts, E-Learning oder Synchronisation.          
            
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://linkedin.com" className="text-gray-500 hover:text-accent-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@philyourvoice" className="text-gray-500 hover:text-accent-500 transition-colors duration-300">
                <img
                  src={process.env.PUBLIC_URL + '/images/tiktokicon.png'}
                  alt="TikTok"
                  className="w-6 h-6 opacity-65 hover:opacity-100 transform transition duration-200 filter grayscale hover:grayscale-0 scale-120 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-accent-500 mb-4">Rechtliches</h4>
            <div className="space-y-3">
              <Link 
                to="/impressum" 
                className="text-gray-700 hover:text-accent-500 transition-colors duration-300 block"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz" 
                className="text-gray-700 hover:text-accent-500 transition-colors duration-300 block"
              >
                Datenschutz
              </Link>
              <Link 
                to="/agb" 
                className="text-gray-700 hover:text-accent-500 transition-colors duration-300 block"
              >
                AGB
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-accent-500 mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-end">
                <svg className="w-5 h-5 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">philipp@voiceover.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <svg className="w-5 h-5 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <svg className="w-5 h-5 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">Linz, Österreich</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-light-border text-center">
          <p className="text-gray-600">
            © 2025 Philipp Obermüller. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
