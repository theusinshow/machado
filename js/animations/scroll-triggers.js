function splitTextByLines(el) {
  if (typeof SplitText === 'undefined') return null;
  return new SplitText(el, { type: 'lines', linesClass: 'line-wrap' });
}

export function initScrollTriggers() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    const footerHeadline = document.querySelector('.footer-headline');
    if (footerHeadline) gsap.set(footerHeadline, { opacity: 0.08 });
    return;
  }

  if (!document.querySelector('[data-animate]')) return;

  // Batch all offsetWidth reads before any animations are created (avoids forced reflow)
  const headingData = Array.from(document.querySelectorAll('[data-animate="section-heading"]')).map((el) => {
    const rule = el.querySelector('.section-heading__rule');
    const square = el.querySelector('.section-heading__square');
    return {
      el,
      meta: el.querySelector('.section-heading__meta'),
      title: el.querySelector('.section-heading__title'),
      subtitle: el.querySelector('.section-heading__subtitle'),
      rule,
      square,
      squareTravel: (rule && square) ? rule.offsetWidth - square.offsetWidth : 0,
    };
  });

  headingData.forEach(({ el, meta, title, subtitle, rule, square, squareTravel }) => {
    const parts = [meta, title, subtitle].filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'machado' }, 0);
    if (square && rule) {
      tl.fromTo(square,
        { x: 0, rotate: 0, opacity: 0 },
        { x: squareTravel, rotate: 180, opacity: 1, duration: 0.9, ease: 'machado' },
        0
      );
    }

    if (parts.length) {
      tl.fromTo(parts,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.72, stagger: 0.1, ease: 'machado' },
        0.08
      );
    }
  });

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
        scale: 1, opacity: 0.08,
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
