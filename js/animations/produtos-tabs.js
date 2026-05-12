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
    const thumbs = [];
    let counter = null;

    const mainEl = gallery ? gallery.querySelector('.produto-gallery__main') : null;

    if (gallery && items.length) {
      const counterEl = document.createElement('div');
      counterEl.className = 'produto-gallery__count mono';
      counterEl.setAttribute('aria-hidden', 'true');
      counterEl.innerHTML = '<span data-gallery-current>01</span><span>/</span><span data-gallery-total></span>';
      counterEl.querySelector('[data-gallery-total]').textContent = String(items.length).padStart(2, '0');

      const thumbsEl = document.createElement('div');
      thumbsEl.className = 'produto-gallery__thumbs';
      thumbsEl.setAttribute('aria-label', 'Miniaturas da galeria');

      items.forEach((item, index) => {
        const image = item.querySelector('img');
        const thumb = document.createElement('button');
        thumb.className = 'produto-gallery__thumb';
        thumb.type = 'button';
        thumb.dataset.galleryThumb = String(index);
        thumb.setAttribute('aria-label', `Ver imagem ${index + 1}`);
        thumb.setAttribute('aria-current', index === 0 ? 'true' : 'false');

        if (image) {
          const thumbImage = document.createElement('img');
          thumbImage.src = image.currentSrc || image.src;
          thumbImage.alt = '';
          thumbImage.loading = 'lazy';
          thumbImage.decoding = 'async';
          thumb.appendChild(thumbImage);
        }

        thumbsEl.appendChild(thumb);
        thumbs.push(thumb);
      });

      // Counter fica sobre a imagem principal; thumbs na coluna lateral
      (mainEl || gallery).append(counterEl);
      gallery.append(thumbsEl);
      counter = counterEl.querySelector('[data-gallery-current]');
    }

    return {
      panel,
      gallery,
      mainEl,
      items,
      prev: gallery?.querySelector('[data-gallery-prev]'),
      next: gallery?.querySelector('[data-gallery-next]'),
      thumbs,
      counter,
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
    galleryState.thumbs.forEach((thumb, i) => {
      const isActive = i === galleryState.index;
      thumb.classList.toggle('is-active', isActive);
      thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    if (galleryState.counter) {
      galleryState.counter.textContent = String(galleryState.index + 1).padStart(2, '0');
    }

    if (!reducedMotion) {
      const activeImage = galleryState.items[galleryState.index]?.querySelector('img');

      if (activeImage) {
        gsap.fromTo(
          activeImage,
          { scale: 1.018 },
          { scale: 1, duration: 1.1, ease: 'machado', overwrite: true }
        );
      }

      const sweepTarget = galleryState.mainEl || galleryState.gallery;
      if (sweepTarget) {
        sweepTarget.classList.remove('is-sweeping');
        void sweepTarget.offsetWidth;
        sweepTarget.classList.add('is-sweeping');
      }
    }
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
      showGalleryItem(galleryState, galleryState.index);

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

    galleryState.thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        stopGallery(galleryState);
        showGalleryItem(galleryState, index);
        if (galleryState.panel.classList.contains('is-active')) scheduleGallery(galleryState);
      });
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

  function updateLineName(index) {
    const nameEl = section.querySelector('.produtos-line-name__suffix');
    const suffix = navItems[index]?.dataset.lineSuffix;
    if (!nameEl || !suffix) return;

    if (reducedMotion) {
      nameEl.textContent = suffix;
      return;
    }

    gsap.to(nameEl, {
      opacity: 0,
      y: 8,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: true,
      onComplete() {
        nameEl.textContent = suffix;
        gsap.fromTo(nameEl,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.38, ease: 'machado' }
        );
      },
    });
  }

  function animatePanel(panel) {
    if (reducedMotion) return;

    const media = panel.querySelector('.produto-gallery');
    if (!media) return;

    gsap.fromTo(media,
      { autoAlpha: 0.85, scale: 0.994 },
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
    activateGallery(nextIndex);
    updateLineName(nextIndex);

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
        gsap.fromTo(panel.querySelectorAll('.produto-gallery, .produto-panel__line-name'),
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
