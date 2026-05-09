/**
 * Galeria da seção Sobre.
 * @module animations/sobre-gallery
 */

export function initSobreGallery() {
  const gallery = document.querySelector('[data-sobre-gallery]');
  if (!gallery) return;

  const slides = gallery.querySelectorAll('[data-sobre-slide]');
  const dots = gallery.querySelectorAll('[data-sobre-dot]');
  if (!slides.length) return;

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const total = slides.length;
  let current = 0;
  let autoplay;

  function setSlide(index) {
    const next = (index + total) % total;
    if (next === current && slides[next].classList.contains('is-active')) return;

    const previousSlide = slides[current];
    const nextSlide = slides[next];
    current = next;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });

    if (shouldReduceMotion || !previousSlide || !nextSlide) return;

    gsap.fromTo(nextSlide,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'machado', overwrite: true }
    );
  }

  function queueAutoplay() {
    if (shouldReduceMotion || total < 2) return;
    if (autoplay) autoplay.kill();

    autoplay = gsap.delayedCall(3.6, () => {
      setSlide(current + 1);
      queueAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.sobreDot, 10);
      if (Number.isNaN(index)) return;
      setSlide(index);
      queueAutoplay();
    });
  });

  if (!shouldReduceMotion) {
    gsap.fromTo(gallery,
      { y: 24, rotate: -1.2 },
      {
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: 'machado',
        scrollTrigger: {
          trigger: gallery,
          start: 'top 82%',
          once: true,
        },
      }
    );
  }

  queueAutoplay();
}
