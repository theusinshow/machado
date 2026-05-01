import { splitTextByLines } from './text-split.js';

export function initScrollTriggers() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    const footerHeadline = document.querySelector('.footer-headline');
    if (footerHeadline) gsap.set(footerHeadline, { opacity: 1 });
    return;
  }

  if (!document.querySelector('[data-animate]')) return;

  // ── fade-up ──
  document.querySelectorAll('[data-animate="fade-up"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1, delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── fade-in ──
  document.querySelectorAll('[data-animate="fade-in"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.9, delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── slide-left ──
  document.querySelectorAll('[data-animate="slide-left"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        duration: 1, delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── slide-right ──
  document.querySelectorAll('[data-animate="slide-right"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 1, delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── scale-in ──
  document.querySelectorAll('[data-animate="scale-in"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1, scale: 1,
        duration: 1.1, delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── lines — SplitText por linhas ──
  document.querySelectorAll('[data-animate="lines"]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    const split = splitTextByLines(el);
    if (!split) return;

    gsap.set(el, { opacity: 1 });
    gsap.fromTo(split.lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        delay,
        ease: 'machado',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  });

  // ── Footer headline scale ──
  const footerHeadline = document.querySelector('.footer-headline');
  if (footerHeadline) {
    gsap.fromTo(footerHeadline,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 1.2,
        ease: 'machado',
        scrollTrigger: {
          trigger: footerHeadline,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  }
}
