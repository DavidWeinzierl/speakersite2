import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near the top
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`bg-white text-gray-900 py-3 px-4 shadow-lg fixed w-full top-0 z-50 border-b border-gray-200 transition-transform duration-300 min-h-[60px] ${
      isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full min-h-[52px]">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
          <img 
            src={process.env.PUBLIC_URL + "/images/PYV2.png"} 
            alt="Phil Your Voice Logo" 
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-display font-bold text-accent-500 leading-tight">
              Phil Your Voice
            </h1>
            <span className="text-xs text-gray-600 hidden sm:inline leading-tight">
              Professioneller Sprecher
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {isHomePage ? (
            <>
              <a href="#aboutMe2" className="text-gray-700 hover:text-accent-500 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
                Über Mich
              </a>
              <a href="#samples" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Hörproben
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Kontakt
              </a>
            </>
          ) : (
            <>
              <Link to="/#aboutMe2" className="text-gray-700 hover:text-accent-500 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
                Über Mich
              </Link>
              <Link to="/#samples" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Hörproben
              </Link>
              <Link to="/#testimonials" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Services
              </Link>
              <Link to="/#contact" className="text-gray-700 hover:text-accent-500 transition-colors duration-300">
                Kontakt
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          <button className="text-accent-500 hover:text-accent-600" aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen((v) => !v)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
            {isHomePage ? (
              <>
                <a href="#aboutMe2" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Über Mich
                </a>
                <a href="#samples" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Hörproben
                </a>
                <a href="#testimonials" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Services
                </a>
                <a href="#contact" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Kontakt
                </a>
              </>
            ) : (
              <>
                <Link to="/#aboutMe2" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Über Mich
                </Link>
                <Link to="/#samples" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Hörproben
                </Link>
                <Link to="/#testimonials" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Services
                </Link>
                <Link to="/#contact" className="block text-gray-800 hover:text-accent-500" onClick={() => setMobileOpen(false)}>
                  Kontakt
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
