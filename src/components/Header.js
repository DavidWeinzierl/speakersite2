import React from 'react';

const Header = () => {
  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md text-gray-900 py-4 px-6 shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-display font-bold text-accent-500">
            Philipp Obermüller
          </h1>
          <span className="ml-3 text-sm text-gray-600 hidden sm:inline">
            Professional Voice
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
            About
          </a>
          <a href="#samples" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
            Audio Samples
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
            Testimonials
          </a>
          <a href="#contact" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
            Contact
          </a>
        </nav>
        <div className="md:hidden">
          <button className="text-accent-500 hover:text-accent-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
