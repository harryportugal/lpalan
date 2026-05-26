import React from 'react';
import './BentoGrid.css';

export default function BentoGrid() {
  return (
    <section id="detalhes" className="bento-section">
      <div className="bento-grid">
        {/* Item Grande */}
        <div className="bento-item bento-large reveal reveal-scale delay-100">
          <img src="/cards/card-1-bento.webp" alt="Design Autêntico" className="bento-bg-img" />
          <div className="bento-overlay"></div>
          <div className="bento-content">
            <h3>Design Autêntico</h3>
            <p>Feito para quem vive a rua. Qualidade extrema em cada detalhe.</p>
          </div>
        </div>
        
        {/* Itens Pequenos */}
        <div className="bento-item bento-has-img reveal reveal-scale delay-200">
          <img src="/cards/close-up.webp" alt="Algodão 100%" className="bento-bg-img" />
          <div className="bento-content">
            <h3>Algodão 100%</h3>
          </div>
        </div>
        <div className="bento-item bento-has-img reveal reveal-scale delay-300">
          <img src="/cards/costura.webp" alt="Costura Reforçada" className="bento-bg-img" />
          <div className="bento-content">
            <h3>Costura Reforçada</h3>
          </div>
        </div>
        
        {/* Item Largo */}
        <div className="bento-item bento-wide bento-has-img reveal reveal-scale delay-400">
          <img src="/cards/card-carro.webp" alt="Edição Limitada" className="bento-bg-img" />
          <div className="bento-content">
            <h3>Edição Limitada</h3>
            <p>Peças exclusivas. Quando acabar, acabou.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
