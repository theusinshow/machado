/**
 * Produtos — vitrine premium com decisão por linha.
 * Desktop: seção pinada troca os painéis por scroll ou navegação.
 * Mobile: painéis empilhados com reveals leves e navegação sticky.
 */

export function initProdutosTabs() {
  const section = document.querySelector('[data-produtos-showcase]');
  if (!section) return;

  const panels = gsap.utils.toArray(section.querySelectorAll('.produto-panel'));
  const navItems = gsap.utils.toArray(section.querySelectorAll('[data-go]'));
  if (!panels.length) return;

  const mm = gsap.matchMedia();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusableSelector = 'a, button, input, select, textarea, [tabindex]';
  let activeIndex = -1;
  let desktopMode = false;

  function syncPanelAccessibility(index) {
    panels.forEach((panel, i) => {
      const inactiveDesktopPanel = desktopMode && i !== index;
      panel.setAttribute('aria-hidden', inactiveDesktopPanel ? 'true' : 'false');

      panel.querySelectorAll(focusableSelector).forEach((el) => {
        if (inactiveDesktopPanel) {
          el.setAttribute('tabindex', '-1');
          return;
        }
        if (el.getAttribute('tabindex') === '-1') {
          el.removeAttribute('tabindex');
        }
      });
    });
  }

  function updateLineContent(index) {
    const nameSuffix = section.querySelector('.produtos-line-name__suffix');
    const descEl = section.querySelector('.produtos-line-desc');
    const ctaEl = section.querySelector('.produtos-line-cta');
    const progressCurrent = section.querySelector('[data-produtos-current]');
    const btn = navItems[index];
    if (!nameSuffix || !btn) return;

    const suffix = btn.dataset.lineSuffix;
    const desc = btn.dataset.desc || '';
    const href = btn.dataset.href || '#';
    const numStr = String(index + 1).padStart(2, '0');

    if (progressCurrent) progressCurrent.textContent = numStr;

    if (reducedMotion) {
      if (suffix) nameSuffix.textContent = suffix;
      if (descEl) descEl.textContent = desc;
      if (ctaEl) ctaEl.href = href;
      return;
    }

    const targets = [nameSuffix, descEl, ctaEl].filter(Boolean);

    gsap.to(targets, {
      opacity: 0,
      y: 6,
      duration: 0.16,
      ease: 'power2.in',
      overwrite: true,
      onComplete() {
        if (suffix) nameSuffix.textContent = suffix;
        if (descEl) descEl.textContent = desc;
        if (ctaEl) ctaEl.href = href;

        gsap.fromTo(targets,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.36, ease: 'machado', stagger: 0.05 }
        );
      },
    });
  }

  function animatePanel(panel) {
    if (reducedMotion) return;
    const figure = panel.querySelector('.produto-figure');
    if (!figure) return;

    gsap.fromTo(figure,
      { autoAlpha: 0.8, scale: 0.97 },
      { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'machado', overwrite: true }
    );
  }

  function setActive(index, shouldAnimate = true) {
    const nextIndex = Math.max(0, Math.min(panels.length - 1, index));
    if (nextIndex === activeIndex) return;

    activeIndex = nextIndex;

    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === nextIndex));
    navItems.forEach((item, i) => {
      const isActive = i === nextIndex;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    syncPanelAccessibility(nextIndex);
    updateLineContent(nextIndex);

    if (shouldAnimate) {
      animatePanel(panels[nextIndex]);
    }
  }

  function scrollToPanel(index, scrollTrigger) {
    const nextIndex = Math.max(0, Math.min(panels.length - 1, index));

    if (!desktopMode || !scrollTrigger) {
      const rootStyles = getComputedStyle(document.documentElement);
      const targetTop = panels[nextIndex].getBoundingClientRect().top + window.scrollY;
      const offset = window.innerWidth < 1024
        ? parseFloat(rootStyles.getPropertyValue('--navbar-height-scrolled')) + parseFloat(rootStyles.getPropertyValue('--space-4'))
        : 0;

      window.scrollTo({
        top: targetTop - offset,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
      setActive(nextIndex);
      return;
    }

    const progress = panels.length > 1 ? nextIndex / (panels.length - 1) : 0;
    scrollTrigger.scroll(scrollTrigger.start + ((scrollTrigger.end - scrollTrigger.start) * progress));
    setActive(nextIndex);
  }

  setActive(0, false);

  const BP_DESKTOP = '(min-width: 1024px)';
  const BP_MOBILE = '(max-width: 1023px)';

  mm.add(BP_DESKTOP, () => {
    desktopMode = true;
    syncPanelAccessibility(activeIndex < 0 ? 0 : activeIndex);

    // ── Efeito 4: reveal de entrada — rail items ──
    const railItems = gsap.utils.toArray(section.querySelectorAll('.produtos-rail__item'));
    if (!reducedMotion) {
      gsap.set(railItems, { autoAlpha: 0, y: 8 });
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.88) * (panels.length - 1)}`,
      pin: true,
      pinSpacing: true,
      onEnter() {
        if (reducedMotion) return;
        gsap.to(railItems, {
          autoAlpha: 1, y: 0,
          duration: 0.55, stagger: 0.07, ease: 'machado',
        });
      },
      onUpdate(self) {
        if (reducedMotion) return;
        const index = Math.max(0, Math.min(
          panels.length - 1,
          Math.round(self.progress * (panels.length - 1))
        ));
        setActive(index);
      },
    });

    // ── Efeitos 1 & 2: spotlight + parallax no stage ──
    const stage = section.querySelector('.produtos-stage');
    let spotFrame = null;
    let sx = 50, sy = 50;

    function renderSpot() {
      spotFrame = null;
      stage.style.setProperty('--mouse-x', `${sx}%`);
      stage.style.setProperty('--mouse-y', `${sy}%`);
    }

    function onStageMove(e) {
      const rect = stage.getBoundingClientRect();
      sx = ((e.clientX - rect.left) / rect.width) * 100;
      sy = ((e.clientY - rect.top) / rect.height) * 100;
      if (!spotFrame) spotFrame = requestAnimationFrame(renderSpot);

      if (reducedMotion) return;
      const nx = (sx / 100 - 0.5) * 2;
      const ny = (sy / 100 - 0.5) * 2;
      const fig = panels[activeIndex]?.querySelector('.produto-figure');
      if (fig) gsap.to(fig, { x: nx * 12, y: ny * 6, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
    }

    function onStageLeave() {
      if (spotFrame) { cancelAnimationFrame(spotFrame); spotFrame = null; }
      stage.style.setProperty('--mouse-x', '50%');
      stage.style.setProperty('--mouse-y', '50%');
      if (!reducedMotion) {
        const fig = panels[activeIndex]?.querySelector('.produto-figure');
        if (fig) gsap.to(fig, { x: 0, y: 0, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      }
    }

    stage.addEventListener('pointermove', onStageMove, { passive: true });
    stage.addEventListener('pointerleave', onStageLeave);

    const handlers = navItems.map((item, index) => {
      const onClick = () => scrollToPanel(index, st);
      item.addEventListener('click', onClick);
      return [item, onClick];
    });

    setActive(activeIndex < 0 ? 0 : activeIndex, false);

    return () => {
      handlers.forEach(([item, onClick]) => item.removeEventListener('click', onClick));
      stage.removeEventListener('pointermove', onStageMove);
      stage.removeEventListener('pointerleave', onStageLeave);
      desktopMode = false;
      syncPanelAccessibility(activeIndex < 0 ? 0 : activeIndex);
      st.kill();
    };
  });

  mm.add(BP_MOBILE, () => {
    desktopMode = false;
    syncPanelAccessibility(activeIndex < 0 ? 0 : activeIndex);

    const handlers = navItems.map((item, index) => {
      const onClick = () => scrollToPanel(index);
      item.addEventListener('click', onClick);
      return [item, onClick];
    });

    const triggers = panels.map((panel, index) => ScrollTrigger.create({
      trigger: panel,
      start: 'top 58%',
      end: 'bottom 42%',
      onEnter: () => setActive(index, false),
      onEnterBack: () => setActive(index, false),
    }));

    if (!reducedMotion) {
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll('.produto-figure, .produto-panel__copy'),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            ease: 'machado',
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              once: true,
            },
          }
        );
      });
    }

    setActive(0, false);

    return () => {
      handlers.forEach(([item, onClick]) => item.removeEventListener('click', onClick));
      triggers.forEach((trigger) => trigger.kill());
    };
  });
}
