/**
 * Diferenciais / Pilares
 * Desktop: seção pina enquanto o scroll avança por cada pilar.
 * Mobile: troca de pilar por posição no scroll normal.
 */

export function initDiferenciais() {
  const section = document.querySelector('[data-diferenciais]');
  if (!section) return;

  const steps = Array.from(section.querySelectorAll('[data-diferencial-step]'));
  const images = Array.from(section.querySelectorAll('[data-diferencial-image]'));
  const indicator = section.querySelector('.diferenciais-indicator');
  if (!steps.length || !images.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = -1;
  let indicatorTween = null;
  let indicatorRotation = 0;

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

  steps.forEach((step, i) => {
    step.setAttribute('aria-current', i === activeIndex ? 'step' : 'false');
  });
  setActive(0);

  if (reducedMotion) {
    return;
  }

  const title = section.querySelector('.diferenciais-title');
  const kicker = section.querySelector('.diferenciais-kicker');

  if ((title || kicker) && !section.querySelector('[data-animate="section-heading"]')) {
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
        setActive(activeIndex);
      },
    }
  );

  const mm = gsap.matchMedia();
  const BP_DESKTOP = '(min-width: 1024px)';
  const BP_MOBILE  = '(max-width: 1023px)';

  // ── Desktop: seção pina e scroll avança pelos pilares ──────────────────────
  mm.add(BP_DESKTOP, () => {
    const stepDistance = Math.round(window.innerHeight * 0.7);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${stepDistance * (steps.length - 1)}`,
      pin: true,
      pinSpacing: true,
      onUpdate(self) {
        const index = Math.max(0, Math.min(
          steps.length - 1,
          Math.round(self.progress * (steps.length - 1))
        ));
        setActive(index);
      },
    });

    return () => st.kill();
  });

  // ── Mobile: troca por posição relativa no scroll normal ────────────────────
  mm.add(BP_MOBILE, () => {
    let ticking = false;

    function syncActiveStep() {
      ticking = false;

      const HYSTERESIS = 90;
      const viewportFocus = window.innerHeight * 0.46;
      let closestIndex = activeIndex < 0 ? 0 : activeIndex;
      let closestDistance = Number.POSITIVE_INFINITY;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const stepCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(stepCenter - viewportFocus);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex === activeIndex || activeIndex < 0) {
        setActive(closestIndex);
        return;
      }

      const currentRect = steps[activeIndex].getBoundingClientRect();
      const currentCenter = currentRect.top + currentRect.height * 0.5;
      const currentDistance = Math.abs(currentCenter - viewportFocus);

      if (closestDistance + HYSTERESIS < currentDistance) {
        setActive(closestIndex);
      }
    }

    function requestSync() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncActiveStep);
    }

    syncActiveStep();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
    };
  });
}
