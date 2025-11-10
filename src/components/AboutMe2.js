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
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-transparent"
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
          height: '90%',
          transform: 'translate(-50%, 0)'
        }}
      />

      {/* Chat-style Speech Bubble with parallax effect */}
      <div
        ref={speechBubbleRef}
        className="absolute will-change-transform z-30 hidden md:block"
        style={{
          right: '15%',
          top: '30%',
          transform: 'translateY(0)'
        }}
      >
        <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl rounded-bl-sm px-6 py-4 shadow-lg border border-white/50 max-w-sm">
          {/* Chat bubble tail - bottom left pointing towards speaker */}
          <div className="absolute -left-2 bottom-0 w-0 h-0" 
            style={{
              borderTop: '20px solid rgba(255, 255, 255, 0.4)',
              borderLeft: '20px solid transparent',
              filter: 'drop-shadow(-2px 2px 3px rgba(0, 0, 0, 0.1))'
            }}>
          </div>
          
          {/* Speech bubble content */}
          <p className="text-gray-900 font-normal text-base leading-relaxed">
            {speakerData.about}
          </p>
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
          points="0,10 30,40 100,60 100,100 0,100"
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
          points="0,30  100,60 100,100 0,100"
          fill="#eeeeeeff"
          vectorEffect="non-scaling-stroke"
          transform="translate(0,0)"
        />
      </svg>
    </section>
  );
};

export default AboutMe2;
