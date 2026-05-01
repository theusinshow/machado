/**
 * Diferenciais / Pilares
 * Ativa cada pilar conforme o scroll e troca a imagem lateral.
 */

export function initDiferenciais() {
  const section = document.querySelector('[data-diferenciais]');
  if (!section) return;

  const steps = Array.from(section.querySelectorAll('[data-diferencial-step]'));
  const images = Array.from(section.querySelectorAll('[data-diferencial-image]'));
  const indicator = section.querySelector('.diferenciais-indicator');
  if (!steps.length || !images.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersVirtualScroll = window.matchMedia('(min-width: 1024px)');
  let activeIndex = -1;
  let ticking = false;
  let indicatorTween = null;
  let indicatorRotation = 0;
  let progressTrigger = null;

  function moveIndicatorTo(step) {
    if (!indicator || !step) return;

    const number = step.querySelector('.diferencial-step__num');
    const targetOffset = number
      ? step.offsetTop + number.offsetTop + (number.offsetHeight / 2) - (indicator.offsetHeight / 2)
      : step.offsetTop;

    if (reducedMotion) {
      indicator.style.transform = `translateY(${targetOffset}px)`;
      return;
    }

    if (indicatorTween) indicatorTween.kill();
    indicatorRotation += 180;

    indicatorTween = gsap.to(indicator, {
      y: targetOffset,
      opacity: 1,
      duration: 0.72,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(indicator, {
      '--indicator-rotation': `${indicatorRotation}deg`,
      duration: 0.72,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }

  function setActive(index) {
    if (index === activeIndex) return;

    activeIndex = index;

    steps.forEach((step, i) => {
      const isActive = i === index;
      step.classList.toggle('is-active', isActive);
      step.setAttribute('aria-current', isActive ? 'step' : 'false');
    });

    images.forEach((image, i) => {
      image.classList.toggle('is-active', i === index);
    });

    moveIndicatorTo(steps[index]);
  }

  function syncActiveStep() {
    ticking = false;

    if (progressTrigger && progressTrigger.isActive) return;

    const viewportFocus = window.innerHeight * 0.46;
    let nextIndex = activeIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    steps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const stepCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(stepCenter - viewportFocus);

      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    setActive(nextIndex);
  }

  function requestSync() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(syncActiveStep);
  }

  steps.forEach((step, i) => {
    step.setAttribute('aria-current', i === activeIndex ? 'step' : 'false');
  });
  setActive(0);

  if (reducedMotion) {
    return;
  }

  const title = section.querySelector('.diferenciais-title');
  const kicker = section.querySelector('.diferenciais-kicker');

  if (title || kicker) {
    gsap.fromTo([title, kicker].filter(Boolean),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'machado',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
          markers: false,
        },
      }
    );
  }

  gsap.fromTo(steps,
    { opacity: 0, y: 28 },
    {
      opacity: (index) => (index === activeIndex ? 1 : 0.42),
      y: 0,
      duration: 0.72,
      ease: 'machado',
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 68%',
        once: true,
        markers: false,
      },
      onComplete() {
        gsap.set(steps, { clearProps: 'opacity,transform' });
        syncActiveStep();
      },
    }
  );

  function initProgressTrigger() {
    if (!prefersVirtualScroll.matches || typeof ScrollTrigger === 'undefined') return;

    if (progressTrigger) {
      progressTrigger.kill();
      progressTrigger = null;
    }

    progressTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (steps.length - 1) * 0.78}`,
      pin: section.querySelector('.diferenciais-layout'),
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
      onUpdate(self) {
        const rawIndex = Math.round(self.progress * (steps.length - 1));
        const nextIndex = Math.min(steps.length - 1, Math.max(0, rawIndex));
        setActive(nextIndex);
      },
    });
  }

  syncActiveStep();
  initProgressTrigger();

  if (!progressTrigger) {
    window.addEventListener('scroll', requestSync, { passive: true });
  }

  window.addEventListener('resize', requestSync, { passive: true });

  prefersVirtualScroll.addEventListener('change', () => {
    if (progressTrigger) {
      progressTrigger.kill();
      progressTrigger = null;
    }

    initProgressTrigger();
    requestSync();
  });
}
