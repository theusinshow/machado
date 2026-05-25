export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    if (!loader) { resolve(); return; }

    const logo = loader.querySelector('.loader__logo');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      loader.remove();
      resolve();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'machado' } });

    if (logo) {
      tl.to(logo, { opacity: 1, y: 0, duration: 0.55 });
    }

    tl.to(loader, {
      y: '-100%',
      duration: 0.65,
      ease: 'power3.inOut',
      delay: 0.65,
      onStart: resolve,
      onComplete: () => loader.remove(),
    });
  });
}
