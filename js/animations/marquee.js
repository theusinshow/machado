/**
 * Marquee horizontal opcional
 * Inicializa apenas quando existir um bloco com data-marquee no DOM.
 */

export function initMarquee() {
  const marquees = document.querySelectorAll('[data-marquee]');
  if (!marquees.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  marquees.forEach((marquee) => {
    const track = marquee.querySelector('[data-marquee-track]');
    if (!track) return;

    const distance = track.scrollWidth / 2;
    if (!distance) return;

    const speed = parseFloat(marquee.dataset.speed) || 1;
    const duration = Math.max(12, distance / 60) / speed;

    const tween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -distance,
        duration,
        ease: 'none',
        repeat: -1,
      }
    );

    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      markers: false,
      onEnter: () => tween.play(),
      onLeave: () => tween.pause(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.pause(),
    });
  });
}
