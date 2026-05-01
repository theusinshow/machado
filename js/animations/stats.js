export function initStats() {
  const cards = document.querySelectorAll('[data-stats-card]');
  if (!cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    gsap.set(cards, { opacity: 1, clearProps: 'transform' });
    gsap.set(document.querySelectorAll('[data-stats-card] .stat-label'), {
      opacity: 1,
      clearProps: 'transform',
    });
    return;
  }

  // Pré-define estado inicial dos labels antes dos ScrollTriggers dispararem
  gsap.set(document.querySelectorAll('[data-stats-card] .stat-label'), {
    opacity: 0,
    y: 10,
  });

  cards.forEach((card) => {
    const delay   = parseFloat(card.dataset.delay) || 0;
    const valueEl = card.querySelector('.stat-number__value');
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

    // 3 — Números contam a partir de zero
    if (valueEl && valueEl.dataset.count !== undefined) {
      const target = parseFloat(valueEl.dataset.count);
      const suffix = valueEl.dataset.countSuffix || '';
      const obj    = { val: 0 };

      tl.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate() {
          valueEl.textContent = Math.round(obj.val) + suffix;
        },
      }, 0.45);
    }
  });
}
