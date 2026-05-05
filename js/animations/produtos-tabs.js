/**
 * Produtos — vitrine horizontal com ScrollTrigger
 */

export function initProdutosTabs() {
  const section = document.querySelector('#produtos');
  if (!section) return;

  const track = section.querySelector('.produtos-track');
  const panels = gsap.utils.toArray(section.querySelectorAll('.produto-slide'));
  const progressItems = gsap.utils.toArray(section.querySelectorAll('[data-go]'));
  const prevButton = section.querySelector('[data-produtos-prev]');
  const nextButton = section.querySelector('[data-produtos-next]');
  if (!track || !panels.length) return;

  const mm = gsap.matchMedia();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = -1;

  function animatePanel(panel) {
    const image = panel.querySelector('.produto-slide__img');
    const textItems = [
      panel.querySelector('.produto-slide__kicker'),
      panel.querySelector('.produto-slide__title'),
      ...panel.querySelectorAll('.produto-slide__specs p'),
      panel.querySelector('.produto-slide__extra'),
      panel.querySelector('.produto-slide__cta'),
    ].filter(Boolean);

    if (!textItems.length) return;
    if (reducedMotion) {
      gsap.set(textItems, { autoAlpha: 1, x: 0, y: 0 });
      if (image) gsap.set(image, { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'machado', overwrite: true } });

    if (image) {
      tl.fromTo(image,
        { autoAlpha: 0.78, y: 18, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
        0
      );
    }

    tl.fromTo(textItems,
      { autoAlpha: 0, x: 28 },
      { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.1 },
      0.08
    );
  }

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
    progressItems.forEach((item, i) => item.classList.toggle('is-active', i === index));

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === panels.length - 1;

    const images = panels.map((panel) => panel.querySelector('.produto-slide__img')).filter(Boolean);

    if (reducedMotion) {
      gsap.set(images, { scale: 1 });
    } else {
      gsap.to(images, {
        scale: (i) => (i === index ? 1.025 : 1),
        duration: 1,
        ease: 'machado',
        overwrite: true,
      });
    }

    animatePanel(panels[index]);
  }

  mm.add('(min-width: 1024px)', () => {
    const handlers = [];
    let targetIndex = 0;

    function goToPanel(index, instant = false) {
      targetIndex = Math.min(panels.length - 1, Math.max(0, index));
      setActive(targetIndex);

      gsap.to(track, {
        x: -window.innerWidth * targetIndex,
        duration: instant || reducedMotion ? 0 : 0.85,
        ease: 'machado',
        overwrite: true,
      });
    }

    function addControl(el, callback) {
      if (!el) return;
      el.addEventListener('click', callback);
      handlers.push([el, callback]);
    }

    progressItems.forEach((item, i) => addControl(item, () => goToPanel(i)));
    addControl(prevButton, () => goToPanel(targetIndex - 1));
    addControl(nextButton, () => goToPanel(targetIndex + 1));

    const onResize = () => goToPanel(targetIndex, true);
    window.addEventListener('resize', onResize, { passive: true });

    goToPanel(0, true);

    return () => {
      handlers.forEach(([item, onClick]) => item.removeEventListener('click', onClick));
      window.removeEventListener('resize', onResize);
      gsap.set(track, { clearProps: 'transform' });
    };
  });

  mm.add('(max-width: 1023px)', () => {
    if (reducedMotion) {
      gsap.set(section.querySelectorAll('.produto-slide__text-inner > *'), { autoAlpha: 1, y: 0 });
      setActive(0);
      return;
    }

    panels.forEach((panel, i) => {
      gsap.fromTo(panel.querySelectorAll('.produto-slide__text-inner > *'),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'machado',
          stagger: 0.1,
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            onEnter: () => setActive(i),
          },
        }
      );
    });

    setActive(0);
  });
}
