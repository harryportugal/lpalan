import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShirtSelector from './components/ShirtSelector';
import BentoGrid from './components/BentoGrid';
import CTAFinal from './components/CTAFinal';
import './App.css';

function App() {
  return (
    <>
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
