import { initLenis }         from './lenis.js';
import { initLoader }        from './loader.js';
import { initHero }          from './animations/hero.js';
import { initMarquee }       from './animations/marquee.js';
import { initScrollTriggers } from './animations/scroll-triggers.js';
import { initDiferenciais }  from './animations/diferenciais.js';
import { initStats }         from './animations/stats.js';
import { initCounters }      from './animations/counters.js';
import { initMagnetic }      from './animations/magnetic.js';
import { initProdutosTabs }  from './animations/produtos-tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initStats();

  initLoader().then(() => {
    initHero();
    initMarquee();
    initDiferenciais();
    initScrollTriggers();
    initCounters();
    initMagnetic();
    initProdutosTabs();
    initSobreGallery();
    initNavbar();
    initContactForm();
    initDepoimentos();
    initButtonSwap();
  });
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 80;
  const toggle = document.querySelector('.navbar-toggle');
  const toggleLabel = toggle?.querySelector('.navbar-toggle__label');
  const panel = document.getElementById('navbar-panel');
  const panelInner = panel?.querySelector('.navbar-panel__inner');
  const lightSections = document.querySelectorAll('.section--light');

  if (!toggle || !toggleLabel || !panel || !panelInner) return;

  let menuOpen = false;

  function syncNavbarTheme() {
    if (menuOpen) return;

    const navProbe = navbar.getBoundingClientRect().bottom + 24;
    let shouldUseLightTheme = false;

    lightSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const overlapsNavbarBand = rect.top <= navProbe && rect.bottom >= 0;
      if (overlapsNavbarBand) {
        shouldUseLightTheme = true;
      }
    });

    navbar.classList.toggle('navbar--light', shouldUseLightTheme);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    syncNavbarTheme();
  }, { passive: true });

  window.addEventListener('resize', syncNavbarTheme, { passive: true });

  function openMenu() {
    menuOpen = true;
    navbar.classList.add('is-open');
    navbar.classList.remove('navbar--light');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-label', 'Fechar menu');
    toggle.setAttribute('aria-expanded', 'true');
    toggleLabel.textContent = 'Close';
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({ defaults: { ease: 'machado' } });

    tl.fromTo(panelInner,
      { opacity: 0, y: 20, clipPath: 'inset(0% 0% 100% 0%)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45 }
    );

    const panelNavLinks = panel.querySelectorAll('.navbar-panel__nav a');
    tl.fromTo(panelNavLinks,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
      '-=0.25'
    );

    const metaBlocks = panel.querySelectorAll('.navbar-panel__meta > *');
    tl.fromTo(metaBlocks,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      '-=0.35'
    );

    const cards = panel.querySelectorAll('.navbar-card');
    tl.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.35'
    );

    tl.call(() => moveIndicatorToActive());
  }

  function closeMenu() {
    if (!menuOpen) return;

    menuOpen = false;
    navbar.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggleLabel.textContent = 'Menu';
    document.body.style.overflow = '';

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete() {
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('is-open');
        gsap.set(panelInner, { clearProps: 'all' });
        syncNavbarTheme();
      },
    });

    tl.to(panelInner, {
      opacity: 0,
      y: 16,
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.28,
    });
  }

  toggle.addEventListener('click', () => {
    if (menuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!menuOpen) return;
      closeMenu();
    });
  });

  panel.addEventListener('click', (event) => {
    if (!menuOpen) return;
    if (panelInner.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!menuOpen) return;
    closeMenu();
  });

  /* ── Indicador animado ── */
  const indicator = panel.querySelector('.nav-indicator');
  const navLinks = panel.querySelectorAll('.navbar-panel__nav a');

  function positionIndicator(target) {
    if (!indicator || !target) return;
    const iconH = indicator.offsetHeight;
    const linkCenter = target.offsetTop + target.offsetHeight / 2;
    indicator.style.transform = `translateY(${linkCenter - iconH / 2}px)`;
  }

  function moveIndicatorToActive() {
    const active = panel.querySelector('.navbar-panel__nav a.is-active');
    if (active) positionIndicator(active);
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => positionIndicator(link));
  });

  const nav = panel.querySelector('.navbar-panel__nav');
  if (nav) {
    nav.addEventListener('mouseleave', moveIndicatorToActive);
  }

  // Reposiciona ao redimensionar
  window.addEventListener('resize', () => {
    if (menuOpen) moveIndicatorToActive();
  }, { passive: true });

  syncNavbarTheme();
}

function initSobreGallery() {
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

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const required = form.querySelectorAll('[required]');
    required.forEach((field) => {
      const isBlank = !field.value.trim();
      field.classList.toggle('is-error', isBlank);
      if (isBlank) valid = false;
    });

    if (!valid) return;

    const btn = form.querySelector('[type="submit"]');
    const label = btn.querySelector('.btn__label') || btn.querySelector('span');
    const original = label.textContent;
    label.textContent = 'ENVIANDO...';
    btn.disabled = true;

    setTimeout(() => {
      label.textContent = 'ENVIADO!';
      setTimeout(() => {
        label.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2500);
    }, 1200);
  });

  // Limpar erro ao digitar
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });
}

function initDepoimentos() {
  const track   = document.querySelector('.depoimentos-track');
  const cards   = document.querySelectorAll('.depoimento-card');
  const btnPrev = document.querySelector('.dep-btn--prev');
  const btnNext = document.querySelector('.dep-btn--next');

  if (!track || !cards.length) return;

  let current = 0;
  const total = cards.length;

  function goTo(index) {
    current = (index + total) % total;
    gsap.to(track, {
      x: -current * 100 + '%',
      duration: 0.6,
      ease: 'snap',
    });
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
}

function initButtonSwap() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.btn--split').forEach((btn) => {
    const label = btn.querySelector('.btn__label');
    const plus  = btn.querySelector('.btn__plus');
    if (!label || !plus) return;

    btn.addEventListener('mouseenter', () => {
      const lw = label.offsetWidth;
      const pw = plus.offsetWidth;
      gsap.to(plus,  { x: -lw, duration: 0.34, ease: 'power2.inOut', overwrite: true });
      gsap.to(label, { x: pw,  duration: 0.34, ease: 'power2.inOut', overwrite: true });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(plus,  { x: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true });
      gsap.to(label, { x: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true });
    });
  });
}
