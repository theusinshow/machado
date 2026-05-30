/**
 * Hero animation
 *
 * O reveal de texto (kicker, título, subtítulo) e dos CTAs agora é 100% CSS
 * (@keyframes heroRv / heroFade) — roda no primeiro frame, sem esperar o GSAP
 * carregar do CDN. Isso mantém FCP/LCP rápidos e evita o "flash" de re-esconder
 * o texto. Aqui ficam apenas os efeitos não-críticos para a primeira pintura.
 */

export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroMedia = document.querySelector('.hero-media');
  const heroStage = document.querySelector('.hero-stage');
  const heroScroll = document.querySelector('.hero-scroll');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    if (heroMedia) gsap.set(heroMedia, { opacity: 1, scale: 1, x: 0 });
    if (heroScroll) gsap.set(heroScroll, { opacity: 1, y: 0 });
    hero.classList.add('is-ready');
    return;
  }

  if (heroMedia) {
    gsap.to(heroMedia, {
      scale: 1,
      duration: 1.2,
      ease: 'machado',
      delay: 0.16,
      onComplete() { hero.classList.add('is-ready'); },
    });
  } else {
    hero.classList.add('is-ready');
  }

  if (heroScroll) {
    gsap.fromTo(heroScroll,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5 }
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
