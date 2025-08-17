import React from 'react';

const Testimonial = ({ quote, author, title }) => {
  return (
    <div className="bg-white p-8 rounded-lg border border-light-border hover:border-accent-500 transition-all duration-300 relative shadow-md hover:shadow-lg">
      {/* Quote icon */}
      <div className="absolute -top-4 left-8">
        <div className="bg-accent-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
      </div>
      
      <div className="pt-4">
        <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
          "{quote}"
        </p>
        <div className="border-t border-light-border pt-4">
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-accent-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;