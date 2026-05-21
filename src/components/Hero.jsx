import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero-container">
      <div className="hero-bg-image"></div>
      
      {/* Animated Scroll Arrow SVG */}
      <div className="hero-scroll-down">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="scroll-arrow-svg"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
