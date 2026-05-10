/**
 * Produtos — vitrine premium com decisão por linha.
 * Desktop: seção pinada troca os painéis por scroll ou navegação.
 * Mobile: painéis empilhados com navegação sticky e reveals leves.
 */

export function initProdutosTabs() {
  const section = document.querySelector('[data-produtos-showcase]');
  if (!section) return;

  const panels = gsap.utils.toArray(section.querySelectorAll('.produto-panel'));
  const navItems = gsap.utils.toArray(section.querySelectorAll('[data-go]'));
  if (!panels.length) return;

  const mm = gsap.matchMedia();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const galleryDelay = 3.4;
  const focusableSelector = 'a, button, input, select, textarea, [tabindex]';
  let activeIndex = -1;
  let desktopMode = false;

  const galleries = panels.map((panel) => {
    const gallery = panel.querySelector('[data-product-gallery]');
    const items = gallery ? gsap.utils.toArray(gallery.querySelectorAll('.produto-gallery__item')) : [];

    return {
      panel,
      gallery,
      items,
      prev: gallery?.querySelector('[data-gallery-prev]'),
      next: gallery?.querySelector('[data-gallery-next]'),
      index: 0,
      timer: null,
    };
  });

  function stopGallery(galleryState) {
    if (!galleryState.timer) return;
    galleryState.timer.kill();
    galleryState.timer = null;
  }

  function showGalleryItem(galleryState, index) {
    if (!galleryState.items.length) return;

    galleryState.index = (index + galleryState.items.length) % galleryState.items.length;
    galleryState.items.forEach((item, i) => item.classList.toggle('is-active', i === galleryState.index));
  }

  function scheduleGallery(galleryState) {
    if (reducedMotion || galleryState.items.length < 2) return;

    stopGallery(galleryState);
    galleryState.timer = gsap.delayedCall(galleryDelay, () => {
      showGalleryItem(galleryState, galleryState.index + 1);
      scheduleGallery(galleryState);
    });
  }

  function activateGallery(index) {
    galleries.forEach((galleryState, i) => {
      stopGallery(galleryState);
      showGalleryItem(galleryState, 0);

      if (i === index) {
        scheduleGallery(galleryState);
      }
    });
  }

  galleries.forEach((galleryState) => {
    if (!galleryState.items.length) return;

    galleryState.prev?.addEventListener('click', () => {
      stopGallery(galleryState);
      showGalleryItem(galleryState, galleryState.index - 1);
      if (galleryState.panel.classList.contains('is-active')) scheduleGallery(galleryState);
    });

    galleryState.next?.addEventListener('click', () => {
      stopGallery(galleryState);
      showGalleryItem(galleryState, galleryState.index + 1);
      if (galleryState.panel.classList.contains('is-active')) scheduleGallery(galleryState);
    });
  });

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

  function animatePanel(panel) {
    if (reducedMotion) return;

    const items = [
      panel.querySelector('.produto-panel__kicker'),
      panel.querySelector('.produto-panel__title'),
      panel.querySelector('.produto-panel__capacity'),
      panel.querySelector('.produto-specs'),
      panel.querySelector('.produto-panel__text'),
      panel.querySelector('.produto-panel__cta'),
    ].filter(Boolean);

    const media = panel.querySelector('.produto-gallery');
    const tl = gsap.timeline({ defaults: { ease: 'machado', overwrite: true } });

    if (media) {
      tl.fromTo(media,
        { autoAlpha: 0.88, y: 14, scale: 0.992 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
        0
      );
    }

    tl.fromTo(items,
      { autoAlpha: 0, x: 18 },
      { autoAlpha: 1, x: 0, duration: 0.72, stagger: 0.06 },
      0.08
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
    activateGallery(nextIndex);

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

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.88) * (panels.length - 1)}`,
      pin: true,
      pinSpacing: true,
      onUpdate(self) {
        if (reducedMotion) return;

        const index = Math.max(0, Math.min(
          panels.length - 1,
          Math.round(self.progress * (panels.length - 1))
        ));

        setActive(index);
      },
    });

    const handlers = navItems.map((item, index) => {
      const onClick = () => scrollToPanel(index, st);
      item.addEventListener('click', onClick);
      return [item, onClick];
    });

    setActive(activeIndex < 0 ? 0 : activeIndex, false);

    return () => {
      handlers.forEach(([item, onClick]) => item.removeEventListener('click', onClick));
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
        gsap.fromTo(panel.querySelectorAll('.produto-panel__content > *, .produto-panel__media'),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            ease: 'machado',
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              start: 'top 78%',
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
