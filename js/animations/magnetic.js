export function initMagnetic() {
  const magnets = document.querySelectorAll('[data-magnetic]');
  if (!magnets.length) return;
  if (window.matchMedia('(hover: none)').matches) return;

  magnets.forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.25;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}
