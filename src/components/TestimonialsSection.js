import React from 'react';
import Testimonial from './Testimonial';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-20 px-6 bg-light-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            What Clients Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by brands, agencies, and production companies worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} quote={testimonial.quote} author={testimonial.author} title={testimonial.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;