/**
 * Stats section reveal
 * @module animations/stats
 * @requires GSAP, ScrollTrigger
 */

export function initStats() {
  const cards = document.querySelectorAll('[data-stats-card]');
  if (!cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    gsap.set(cards, { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set('.stat-square, .stat-label', { opacity: 1, clearProps: 'transform' });
    return;
  }

  cards.forEach((card) => {
    const delay = parseFloat(card.dataset.delay) || 0;
    const square = card.querySelector('.stat-square');
    const label = card.querySelector('.stat-label');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        once: true,
        markers: false,
      },
      delay,
      defaults: {
        ease: 'machado',
      },
    });

    tl.fromTo(
      card,
      {
        opacity: 0,
        y: 48,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
      }
    );

    if (square) {
      tl.fromTo(
        square,
        {
          opacity: 0,
          x: -10,
          y: 6,
          rotate: -45,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.6,
        },
        '-=0.38'
      );
    }

    if (label) {
      tl.fromTo(
        label,
        {
          opacity: 0,
          x: -8,
          y: 6,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
        },
        square ? '-=0.48' : '-=0.32'
      );
    }
  });
}
