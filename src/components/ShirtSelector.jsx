import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ShirtSelector.css';

// Dados de exemplo baseados na imagem fornecida
const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: 'CONCEITO STREETWEAR',
    category: 'Coleção',
    image: '/carrossel/1.webp',
  },
  {
    id: 2,
    title: 'ESTILO DE RUA',
    category: '',
    image: '/carrossel/2.webp',
  },
  {
    id: 3,
    title: 'CADA FRASE UM CORRE',
    category: 'Lançamento',
    image: '/carrossel/3.webp',
  },
  {
    id: 4,
    title: 'PEÇA EXCLUSIVA',
    category: '',
    image: '/carrossel/4.webp',
  },
  {
    id: 5,
    title: 'DROP PREMIUM',
    category: 'Novo',
    image: '/carrossel/5.webp',
  },
  {
    id: 6,
    title: 'DETALHES DA MARCA',
    category: '',
    image: '/carrossel/6.webp',
  },
  {
    id: 7,
    title: 'VIBE LIMITADA',
    category: 'Drop 01',
    image: '/carrossel/7.webp',
  },
  {
    id: 8,
    title: 'ESSENCIAL',
    category: '',
    image: '/carrossel/8.webp',
  },
  {
    id: 9,
    title: 'DROP EXCLUSIVO',
    category: 'Corre',
    image: '/carrossel/9.webp',
  },
  {
    id: 10,
    title: 'VISUAL STREET',
    category: '',
    image: '/carrossel/10.webp',
  },
];

export default function ShirtSelector() {
  // Em vez de prender o índice de 0 a 4, deixamos crescer infinitamente.
  // Isso garante que o carrossel nunca "rebobine" bruscamente.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estados para suportar gestos de deslizar o dedo (swipe) no mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50; // Distância mínima em px para acionar a rotação

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handlers para o gesto de toque/deslizar
  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Suporte a setas do teclado para UX melhorada
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // QUANTIDADE DE CARDS RENDERIZADOS:
  // Renderizamos 3 cards para a esquerda e 3 para a direita (7 no total).
  // Os cards nas posições -3 e +3 ficam invisíveis (opacity 0). 
  // O "pulo" do loop infinito acontece escondido lá atrás, garantindo transição 100% suave.
  const visibleCount = 3; 
  const itemsToRender = [];

  for (let i = currentIndex - visibleCount; i <= currentIndex + visibleCount; i++) {
    // Matemática para mapear o índice infinito de volta aos 5 itens do array
    const dataIndex = ((i % CAROUSEL_ITEMS.length) + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    const item = CAROUSEL_ITEMS[dataIndex];
    const offset = i - currentIndex; // Posição relativa ao centro (-3 a +3)
    itemsToRender.push({ absoluteIndex: i, item, offset });
  }

  // Função centralizadora de estilos baseada na distância do centro
  const getCardStyle = (offset) => {
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);

    // Cards além da 2ª posição lateral ficam escondidos para preparar a entrada suave
    if (abs > 2) {
      return {
        opacity: 0,
        transform: `translate(-50%, -50%) translateX(${sign * 300}%) scale(0.5) rotateY(${sign * -60}deg)`,
        zIndex: -10,
        pointerEvents: 'none',
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      };
    }

    // Configurações EXATAS para replicar a imagem (sem sobreposição)
    // Arrays representam: [Centro, Lateral 1, Lateral 2]
    const scales = [1, 0.85, 0.7]; 
    const translates = [0, 115, 215]; // translateX em % garante que nunca se sobreponham, independente da tela
    const rotates = [0, -25, -40]; // Rotação negativa para cards virarem o rosto para o centro
    const blurs = [0, 0.3, 0.6]; // Desfoque sutil reduzido (mais suave que antes)
    const zIndexes = [30, 20, 10];

    return {
      opacity: 1,
      transform: `translate(-50%, -50%) translateX(${sign * translates[abs]}%) scale(${scales[abs]}) rotateY(${sign * rotates[abs]}deg)`,
      zIndex: zIndexes[abs],
      filter: abs === 0 ? 'none' : `blur(${blurs[abs]}px)`,
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)', // Curva de animação estilo "Apple"
    };
  };

  return (
    <section id="camisas" className="carousel-section">
      {/* Container Principal 3D */}
      <div 
        className="carousel-container reveal reveal-scale"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {itemsToRender.map(({ absoluteIndex, item, offset }) => {
          const isCenter = offset === 0;

          return (
            <div
              key={absoluteIndex} // A CHAVE AQUI É O ÍNDICE ABSOLUTO. Isso é o segredo do loop perfeito.
              onClick={() => setCurrentIndex(currentIndex + offset)}
              className={`carousel-card ${isCenter ? 'active' : ''}`}
              style={getCardStyle(offset)}
            >
              {/* Imagem de Fundo */}
              <img
                src={item.image}
                alt={item.title}
                className="carousel-card-img"
                draggable={false}
              />
              {/* Botão de Compra */}
              <button 
                className="carousel-buy-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que o clique no botão mude o slide
                  alert(`Redirecionando para a compra de: ${item.title}`);
                }}
              >
                Comprar
              </button>
            </div>
          );
        })}
      </div>

      {/* Setinhas na parte inferior */}
      <div className="carousel-nav reveal delay-200">
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="carousel-btn"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button
          onClick={handleNext}
          aria-label="Próximo"
          className="carousel-btn"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
