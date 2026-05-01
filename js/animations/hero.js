/**
 * Hero animation
 * Clip reveal editorial para textos principais.
 */

export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const revealItems = Array.from(hero.querySelectorAll('[data-hero-reveal]'));
  if (!revealItems.length) return;

  const heroCtas = document.querySelector('.hero-ctas');
  const heroMedia = document.querySelector('.hero-media');
  const heroScroll = document.querySelector('.hero-scroll');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    gsap.set(revealItems, {
      opacity: 1,
      y: 0,
      clipPath: 'none',
    });
    if (heroCtas) gsap.set(heroCtas, { opacity: 1, y: 0 });
    if (heroMedia) gsap.set(heroMedia, { opacity: 1, scale: 1, x: 0 });
    if (heroScroll) gsap.set(heroScroll, { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'machado' } });

  tl.to(revealItems, {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 1.05,
    stagger: 0.12,
  }, 0);

  if (heroCtas) {
    tl.fromTo(heroCtas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.72 },
      '-=0.42'
    );
  }

  if (heroMedia) {
    tl.fromTo(heroMedia,
      { opacity: 0, scale: 1.06, x: 40 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2 },
      0.18
    );
  }

  if (heroScroll) {
    tl.fromTo(heroScroll,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );

    gsap.to(heroScroll.querySelector('.hero-scroll__line'), {
      scaleY: 0.3,
      transformOrigin: 'bottom',
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
}
