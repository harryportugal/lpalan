import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShirtSelector from './components/ShirtSelector';
import BentoGrid from './components/BentoGrid';
import CTAFinal from './components/CTAFinal';
import './App.css';

function App() {
  useEffect(() => {
    const scrollContainer = document.querySelector('.phone-content');
    const reveals = document.querySelectorAll('.reveal');

    if (!scrollContainer || reveals.length === 0) return;

    const observerOptions = {
      root: scrollContainer,
      rootMargin: '0px 0px -60px 0px', // Aciona um pouco antes de entrar totalmente na tela do celular
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Premium Desktop Blocker (Black Screen / Mobile Only warning) */}
      <div className="desktop-blocker">
        <div className="blocker-glow"></div>
        <div className="blocker-content">
          <div className="blocker-icon-container">
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="blocker-phone-svg"
            >
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <div className="blocker-scan-line"></div>
          </div>

          <h1 className="blocker-title">
            ACESSO EXCLUSIVO <span className="purple-text">MOBILE</span>
          </h1>
          
          <p className="blocker-text">
            Esta experiência de streetwear foi desenhada cirurgicamente para telas móveis. Acesse em seu smartphone para explorar o drop.
          </p>

          <div className="blocker-qr-card">
            <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="blocker-qr-svg">
              <rect x="5" y="5" width="25" height="25" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="13" height="13" rx="1" fill="currentColor" />
              
              <rect x="70" y="5" width="25" height="25" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="76" y="11" width="13" height="13" rx="1" fill="currentColor" />
              
              <rect x="5" y="70" width="25" height="25" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="76" width="13" height="13" rx="1" fill="currentColor" />

              <rect x="38" y="8" width="6" height="6" rx="1" fill="currentColor" opacity="0.8" />
              <rect x="48" y="14" width="12" height="6" rx="1" fill="currentColor" opacity="0.6" />
              <rect x="38" y="24" width="6" height="12" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="54" y="24" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
              
              <rect x="8" y="38" width="6" height="6" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="14" y="48" width="12" height="6" rx="1" fill="currentColor" opacity="0.8" />
              <rect x="24" y="38" width="6" height="12" rx="1" fill="currentColor" opacity="0.6" />
              <rect x="24" y="54" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />

              <rect x="38" y="38" width="12" height="12" rx="2" fill="currentColor" opacity="0.95" />
              <rect x="54" y="38" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
              <rect x="38" y="54" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.6" />
              <rect x="50" y="50" width="12" height="12" rx="2" fill="currentColor" opacity="0.85" />
              
              <rect x="70" y="38" width="6" height="6" rx="1" fill="currentColor" opacity="0.8" />
              <rect x="76" y="48" width="12" height="6" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="86" y="38" width="6" height="12" rx="1" fill="currentColor" opacity="0.6" />
              <rect x="86" y="54" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
              
              <rect x="38" y="70" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
              <rect x="48" y="76" width="12" height="6" rx="1" fill="currentColor" opacity="0.75" />
              <rect x="38" y="86" width="6" height="12" rx="1" fill="currentColor" opacity="0.65" />
              <rect x="54" y="86" width="6" height="6" rx="1" fill="currentColor" opacity="0.8" />
              
              <rect x="70" y="70" width="12" height="6" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="86" y="70" width="6" height="6" rx="1" fill="currentColor" opacity="0.85" />
              <rect x="70" y="82" width="6" height="10" rx="1" fill="currentColor" opacity="0.9" />
              <rect x="80" y="82" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.8" />
            </svg>
            <div className="qr-corners">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic ambient backdrop glowing behind the phone in desktop mode */}
      <div className="desktop-bg-glow"></div>

      {/* Simulated Premium Phone Chassis */}
      <div className="phone-chassis">
        {/* Scrollable interior viewport mimicking native touch screens */}
        <div className="phone-content">
          <Navbar />
          <Hero />
          <ShirtSelector />
          <BentoGrid />
          <CTAFinal />
        </div>
      </div>
    </>
  );
}

export default App;
