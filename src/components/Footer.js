import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-secondary text-white py-12 px-6 border-t border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-accent-500 mb-4">
              Philipp Obermüller
            </h3>
            <p className="text-gray-300 mb-4">
              Professional voice talent specializing in radio commercials, corporate narration, and documentary work.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-accent-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-accent-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-accent-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="text-gray-300 space-y-2">
              <li>Radio Commercials</li>
              <li>Corporate Narration</li>
              <li>Documentary Voiceovers</li>
              <li>Audiobook Narration</li>
              <li>Podcast Intros</li>
              <li>E-learning Content</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="text-gray-300 space-y-2">
              <p>Ready to bring your project to life?</p>
              <a 
                href="mailto:philipp.obermuller@example.com" 
                className="inline-block bg-accent-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-300 mt-4"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Philipp Obermüller. All rights reserved. | Professional Voice Talent</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
