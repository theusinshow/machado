/**
 * Hero animation
 * Clip reveal editorial para textos principais.
 */

export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const revealItems = Array.from(hero.querySelectorAll('[data-hero-reveal]'));
  const heroCtas = document.querySelector('.hero-ctas');
  const heroMedia = document.querySelector('.hero-media');
  const heroStage = document.querySelector('.hero-stage');
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

  const revealBlocks = revealItems.map((item) => {
    const block = document.createElement('span');
    block.className = 'hero-reveal__block';
    block.setAttribute('aria-hidden', 'true');
    item.appendChild(block);
    return block;
  });

  const tl = gsap.timeline({
    defaults: { ease: 'machado' },
    onComplete() {
      hero.classList.add('is-ready');
      revealBlocks.forEach((block) => block.remove());
    },
  });

  if (revealItems.length) {
    tl.to(revealBlocks, {
      xPercent: 210,
      duration: 0.72,
      stagger: 0.1,
      ease: 'wipe',
    }, 0);

    tl.to(revealItems, {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.84,
      stagger: 0.1,
    }, 0.12);
  }

  if (heroCtas) {
    tl.fromTo(heroCtas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.62 },
      0.58
    );
  }

  if (heroMedia) {
    tl.fromTo(heroMedia,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'machado' },
      0.16
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

  if (heroStage && window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches) {
    let frame = null;
    let x = 50;
    let y = 50;

    function renderSpotlight() {
      frame = null;
      heroStage.style.setProperty('--mouse-x', `${x}%`);
      heroStage.style.setProperty('--mouse-y', `${y}%`);
    }

    heroStage.addEventListener('pointermove', (event) => {
      const rect = heroStage.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width) * 100;
      y = ((event.clientY - rect.top) / rect.height) * 100;
      if (!frame) frame = requestAnimationFrame(renderSpotlight);
    }, { passive: true });
  }
}
