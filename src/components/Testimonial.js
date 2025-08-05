import React from 'react';

const Testimonial = ({ quote, author, title }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">"{quote}"</p>
      <p className="testimonial-author">
        {author}
        <span>{title}</span>
      </p>
    </div>
  );
};

export default Testimonial;