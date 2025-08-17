import React, { useState, useEffect, useRef } from 'react';

const BrandCarousel = ({ brands }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle infinite scroll reset
  useEffect(() => {
    if (currentIndex >= brands.length) {
      // When we've scrolled through all original brands, reset without transition
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        // Re-enable transition after reset
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700); // Wait for current transition to complete
    }
  }, [currentIndex, brands.length]);

  if (!brands || brands.length === 0) return null;

  // Create an extended array for seamless looping - ensure we have enough brands to show 4 at all times
  const extendedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Meine Referenzen
          </h2>
         
        </div>

        {/* Brand Carousel - Mobile: 2 brands, Desktop: 4 brands */}
        <div className="relative h-40 md:h-48 flex items-center justify-center">
          <div className="w-full max-w-6xl overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`,
                transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none'
              }}
            >
              {extendedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-none w-1/2 md:w-1/4 flex items-center justify-center px-2"
                >
                  <div className="w-48 md:w-64 h-32 md:h-40 bg-white rounded-lg shadow-md flex items-center justify-center p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                      onError={(e) => {
                        // Fallback if image fails to load
                        console.log(`Failed to load image: ${brand.logo}`);
                        e.target.style.display = 'none';
                        const fallbackDiv = e.target.parentNode.querySelector('.fallback-text');
                        if (fallbackDiv) {
                          fallbackDiv.style.display = 'flex';
                        }
                      }}
                      onLoad={(e) => {
                        // Image loaded successfully
                        setLoadedImages(prev => new Set([...prev, brand.id]));
                        e.target.style.display = 'block';
                        const fallbackDiv = e.target.parentNode.querySelector('.fallback-text');
                        if (fallbackDiv) {
                          fallbackDiv.style.display = 'none';
                        }
                      }}
                      style={{ 
                        display: loadedImages.has(brand.id) ? 'block' : 'none'
                      }}
                    />
                    <div 
                      className="fallback-text absolute inset-0 flex items-center justify-center text-gray-600 font-semibold text-sm bg-gray-50"
                      style={{ 
                        display: loadedImages.has(brand.id) ? 'none' : 'flex'
                      }}
                    >
                      {brand.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {brands.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  (currentIndex % brands.length) === index 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default BrandCarousel;
