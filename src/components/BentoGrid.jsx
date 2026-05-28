import React, { useEffect, useRef } from 'react';
import './BentoGrid.css';
import CTAFinal from './CTAFinal';

export default function BentoGrid() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    let scrollContainer = null;
    let handleScrollFn = null;
    let isInitialized = false;

    const init = () => {
      scrollContainer = document.querySelector('.phone-content');
      const container = containerRef.current;
      const section = container?.querySelector('.bento-section');
      const grid = gridRef.current;
      const cta = ctaRef.current;

      // Se algum elemento ainda não estiver no DOM, tenta novamente no próximo frame
      if (!scrollContainer || !container || !section || !grid || !cta) {
        requestAnimationFrame(init);
        return;
      }

      if (isInitialized) return;
      isInitialized = true;

      // Garante alturas físicas perfeitas em pixels para anular bugs de porcentagem e Flexbox!
      let viewportHeight = scrollContainer.clientHeight;
      container.style.height = `${viewportHeight * 2}px`;
      section.style.height = `${viewportHeight}px`;

      const handleScroll = () => {
        const containerRect = container.getBoundingClientRect();
        const parentRect = scrollContainer.getBoundingClientRect();

        // Seguro duplo: Se a altura mudar ou tiver sido lida como 0, recalcula e atualiza dinamicamente
        const currentHeight = scrollContainer.clientHeight || parentRect.height;
        if (currentHeight > 0 && currentHeight !== viewportHeight) {
          viewportHeight = currentHeight;
          container.style.height = `${viewportHeight * 2}px`;
          section.style.height = `${viewportHeight}px`;
        }

        // O scroll dentro da seção começa quando o topo do container atinge o topo do viewport
        const scrolled = parentRect.top - containerRect.top;
        const totalScroll = viewportHeight; // O range de scroll é de exatamente 1 viewport

        if (totalScroll <= 0) return;

        // Progresso de 0 a 1
        const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);

        // Aplica o zoom na grid
        // Começa em scale 1 e vai até 9 (zoom extremo no centro)
        const scale = 1 + progress * 8;
        grid.style.transform = `scale(${scale})`;

        // Desfoca e esmaece os cartões à medida que o zoom avança
        const items = grid.querySelectorAll('.bento-item');
        items.forEach((item) => {
          // Esmaece os itens rapidamente no zoom (foca no fundo branco por volta de 70% do progresso)
          const opacity = Math.max(1 - progress * 1.5, 0);
          item.style.opacity = opacity;
        });

        // Controla o surgimento suave da CTA no fundo branco
        if (progress >= 0.75) {
          // Normaliza o progresso de 0.75 a 1.0 para uma escala de 0.0 a 1.0
          const ctaProgress = (progress - 0.75) / 0.25;
          cta.style.opacity = ctaProgress;
          cta.style.pointerEvents = 'all';
        } else {
          cta.style.opacity = 0;
          cta.style.pointerEvents = 'none';
        }
      };

      handleScrollFn = handleScroll;
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Executa inicialmente
    };

    requestAnimationFrame(init);

    return () => {
      if (scrollContainer && handleScrollFn) {
        scrollContainer.removeEventListener('scroll', handleScrollFn);
      }
    };
  }, []);

  return (
    <div className="bento-scroll-container" ref={containerRef}>
      <section id="detalhes" className="bento-section">
        <div className="bento-grid" ref={gridRef}>
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

        {/* Subsection CTA (Emerges smoothly as the zoom finishes) */}
        <div className="bento-cta-wrapper" ref={ctaRef}>
          <CTAFinal />
        </div>
      </section>
    </div>
  );
}
