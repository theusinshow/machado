export function initStats() {
  const cards = document.querySelectorAll('[data-stats-card]');
  if (!cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const formatStatValue = (value) => `${Math.round(value)}`;
  const valueElements = document.querySelectorAll('[data-stats-card] .stat-number__value[data-count]');

  if (reducedMotion) {
    gsap.set(cards, { opacity: 1, clearProps: 'transform' });
    gsap.set(document.querySelectorAll('[data-stats-card] .stat-label'), {
      opacity: 1,
      clearProps: 'transform',
    });
    valueElements.forEach((valueEl) => {
      const target = parseFloat(valueEl.dataset.count);

      valueEl.textContent = formatStatValue(target);
    });
    return;
  }

  valueElements.forEach((valueEl) => {
    valueEl.textContent = formatStatValue(0);
  });

  // Pré-define estado inicial dos labels antes dos ScrollTriggers dispararem
  gsap.set(document.querySelectorAll('[data-stats-card] .stat-label'), {
    opacity: 0,
    y: 10,
  });

  function animateValue(valueEl) {
    if (valueEl.dataset.counted === 'true') return;

    const target = parseFloat(valueEl.dataset.count);
    const obj = { val: 0 };

    valueEl.dataset.counted = 'true';
    valueEl.textContent = formatStatValue(0);

    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate() {
        valueEl.textContent = formatStatValue(obj.val);
      },
      onComplete() {
        valueEl.textContent = formatStatValue(target);
      },
    });
  }

  cards.forEach((card) => {
    const delay   = parseFloat(card.dataset.delay) || 0;
    const labelEl = card.querySelector('.stat-label');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        once: true,
        markers: false,
      },
      delay,
      defaults: { ease: 'machado' },
    });

    // 1 — Card entra vindo de baixo
    tl.fromTo(card,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.85 }
    );

    // 2 — Label sobe independente durante a entrada do card
    if (labelEl) {
      tl.fromTo(labelEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' },
        0.28
      );
    }
  });

  // Contagem separada da timeline visual: a seção dispara todos os números juntos.
  const statsSection = document.querySelector('.stats-section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        valueElements.forEach(animateValue);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -15% 0px',
    });

    observer.observe(statsSection || cards[0]);
    return;
  }

  valueElements.forEach(animateValue);
}
