import { initLenis }         from './lenis.js';
import { initLoader }        from './loader.js';
import { initCursor }        from './animations/cursor.js';
import { initHero }          from './animations/hero.js';
import { initMarquee }       from './animations/marquee.js';
import { initScrollTriggers } from './animations/scroll-triggers.js';
import { initCounters }      from './animations/counters.js';
import { initMagnetic }      from './animations/magnetic.js';
import { initProdutosTabs }  from './animations/produtos-tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  initLenis();

  initLoader().then(() => {
    initCursor();
    initHero();
    initMarquee();
    initScrollTriggers();
    initCounters();
    initMagnetic();
    initProdutosTabs();
    initNavbar();
    initContactForm();
    initDepoimentos();
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

    gsap.fromTo(panelInner,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'machado' }
    );

    const revealItems = panel.querySelectorAll('.navbar-panel__nav a, .navbar-panel__meta > *, .navbar-card');
    gsap.fromTo(revealItems,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'machado', delay: 0.04 }
    );
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
    gsap.to(panelInner, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      ease: 'power2.inOut',
      onComplete() {
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('is-open');
        syncNavbarTheme();
      },
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

  syncNavbarTheme();
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

    // Feedback visual de envio
    const btn = form.querySelector('[type="submit"]');
    const original = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'ENVIANDO...';
    btn.disabled = true;

    // Simulação — substituir por fetch real
    setTimeout(() => {
      btn.querySelector('span').textContent = 'ENVIADO!';
      setTimeout(() => {
        btn.querySelector('span').textContent = original;
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
