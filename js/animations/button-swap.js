/**
 * Microinteração dos botões split.
 * @module animations/button-swap
 */

export function initButtonSwap() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.btn--split').forEach((btn) => {
    const label = btn.querySelector('.btn__label');
    const plus = btn.querySelector('.btn__plus');
    if (!label || !plus) return;

    btn.addEventListener('mouseenter', () => {
      const labelWidth = label.offsetWidth;
      const plusWidth = plus.offsetWidth;

      gsap.to(plus, { x: -labelWidth, duration: 0.34, ease: 'power2.inOut', overwrite: true });
      gsap.to(label, { x: plusWidth, duration: 0.34, ease: 'power2.inOut', overwrite: true });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(plus, { x: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true });
      gsap.to(label, { x: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true });
    });
  });
}
