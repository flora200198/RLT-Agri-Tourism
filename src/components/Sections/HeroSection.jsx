import React from 'react';
import Button from '../Common/Button'
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Green Valley Farm</h1>
        <p>Experience nature like never before</p>
        <Button variant="primary" size="lg">
          Explore Activities
        </Button>
      </div>
      <div className="hero-image">
        <img 
          src="https://placehold.co/1920x1080" 
          alt="Panoramic view of Green Valley Farm with lush green fields and activities"
        />
      </div>
    </section>
  );
};

export default HeroSection;
