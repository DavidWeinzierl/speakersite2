import React, { useEffect, useRef } from 'react';
import { speakerData } from '../data/content';

const AboutMe2 = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const speechBubbleRef = useRef(null);
  const polygonRef = useRef(null);
  const polygonShapeRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current || !speechBubbleRef.current || !polygonRef.current) return;

      // Parallax effect: move subtly and start as soon as any part is visible
  const speed = 0.9; // closer to 1.0 = subtler movement for the speaker image
  const polygonSpeed = 0.97; // polygon moves a bit slower than the image
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only update when any part of the section is visible
      const isVisible = rect.bottom > 0 && rect.top < windowHeight;
      if (!isVisible) {
        // Reset transforms when off-screen to avoid unexpected jumps
        imgRef.current.style.transform = 'translate(-50%, 0)';
        speechBubbleRef.current.style.transform = 'translateY(0)';
        polygonRef.current.style.transform = 'translateY(0)';
        if (polygonShapeRef.current) polygonShapeRef.current.setAttribute('transform', 'translate(0,0)');
        return;
      }

      // Compute parallax based on distance of section center to viewport center.
      // This starts affecting as soon as the section enters the viewport.
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = viewportCenter - elementCenter;

      // Scale by (1 - speed) so higher `speed` -> smaller movement
      const parallaxOffset = distanceFromCenter * (1 - speed);

      // Apply the transform to the image and speech bubble
      imgRef.current.style.transform = `translate(-50%, ${parallaxOffset}px)`;
      speechBubbleRef.current.style.transform = `translateY(${parallaxOffset}px)`;

      // Apply a smaller parallax to the light-gray polygon so it moves a bit slower
      const parallaxOffsetPolygon = distanceFromCenter * (1 - polygonSpeed);
      // Use SVG transform on the <polygon> shape to avoid CSS/Tailwind transform overrides
      if (polygonShapeRef.current) {
        polygonShapeRef.current.setAttribute('transform', `translate(0, ${parallaxOffsetPolygon})`);
      } else {
        polygonRef.current.style.transform = `translateY(${parallaxOffsetPolygon}px)`;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    // Initial position
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
  className="relative w-full mt-5 h-[72vh] md:h-[84vh] overflow-hidden bg-transparent"
      aria-label="About me parallax section"
    >
      {/* Parallax image - smaller (about 25% of section height), anchored above the bottom 20% */}
      <img
        ref={imgRef}
        src={process.env.PUBLIC_URL + '/images/speaker1.png'}
        alt="Speaker"
        className="absolute will-change-transform object-contain z-30"
        style={{
          left: '30%',
          bottom: '5%',
          height: '100%',
          transform: 'translate(-50%, 0)'
        }}
      />

      {/* Elegant Speech Bubble with parallax effect */}
      <div
        ref={speechBubbleRef}
        className="absolute will-change-transform z-30 hidden md:block"
        style={{
          right: '15%',
          top: '20%',
          transform: 'translateY(0)'
        }}
      >
        <div className="relative max-w-lg">
          {/* Main speech bubble with gradient background */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl px-8 py-8 shadow-2xl border-1 border-gray-200/50"
            style={{
              boxShadow: '0 10px 10px rgba(88, 88, 88, 0.25), 0 0 0 1px rgba(29, 29, 29, 0.1)'
            }}
          >
            {/* Decorative opening quote icon - top left */}
            <div className="absolute -top-12 -right-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl transform rotate-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>
            
            {/* Speech bubble content with accent line */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 pl-4 mb-4">
                {speakerData.aboutTitle}
              </h2>
              <p className="text-gray-800 font-medium text-base leading-relaxed pl-4 mb-6">
                {speakerData.about}
              </p>
            </div>

            {/* Social Media & Contact Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200/50 mt-2">
              {/* Social Media Icons */}
              <div className="flex gap-2">
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-md"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-md"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-md"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>

              {/* Contact Button */}
              <a
                href="#contact"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Kontakt</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>


          </div>
        </div>
      </div>

      {/* Dark slanted polygon overlay - spans full width, sits on bottom 40% */}
      <svg
        className="absolute left-0 right-0 bottom-0 w-full h-[40%] pointer-events-none"
        style={{ zIndex: 31 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* points: left-top y smaller = higher; right-top y larger = lower */}
        <polygon
          points="0,20 30,50 100,70 100,100 0,100"
          fill="#374151"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
    ref={polygonRef}
    className="absolute left-0 right-0 bottom-0 w-full h-[80%] pointer-events-none will-change-transform"
    style={{ zIndex: 1 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* points: left-top y smaller = higher; right-top y larger = lower */}
        <polygon
          ref={polygonShapeRef}
          points="0,30  100,70 100,100 0,100"
          fill="#eeeeeeff"
          vectorEffect="non-scaling-stroke"
          transform="translate(0,0)"
        />
      </svg>
    </section>
  );
};

export default AboutMe2;
