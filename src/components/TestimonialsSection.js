import React from 'react';
import Testimonial from './Testimonial';

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section id="testimonials" className="section">
      <h2 className="section-title">What People Are Saying</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} quote={testimonial.quote} author={testimonial.author} title={testimonial.title} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;