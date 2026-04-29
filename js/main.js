import { initLenis }         from './lenis.js';
import { initLoader }        from './loader.js';
import { initCursor }        from './animations/cursor.js';
import { initHero }          from './animations/hero.js';
import { initScrollTriggers } from './animations/scroll-triggers.js';
import { initCounters }      from './animations/counters.js';
import { initMagnetic }      from './animations/magnetic.js';
import { initProdutosTabs }  from './animations/produtos-tabs.js';

initLenis();

initLoader().then(() => {
  initCursor();
  initHero();
  initScrollTriggers();
  initCounters();
  initMagnetic();
  initProdutosTabs();
  initNavbar();
  initContactForm();
  initDepoimentos();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 80;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  // Mobile menu
  const toggle = document.querySelector('.navbar-toggle');
  const menu   = document.querySelector('.navbar-mobile');
  if (!toggle || !menu) return;

  let menuOpen = false;

  toggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    toggle.classList.toggle('is-open', menuOpen);
    menu.classList.toggle('is-open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    if (menuOpen) {
      gsap.fromTo(menu,
        { opacity: 0, yPercent: -4 },
        { opacity: 1, yPercent: 0, duration: 0.5, ease: 'machado' }
      );

      const links = menu.querySelectorAll('a');
      gsap.fromTo(links,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'machado', delay: 0.1 }
      );
    } else {
      gsap.to(menu, { opacity: 0, yPercent: -4, duration: 0.3, ease: 'power2.in' });
    }
  });

  // Fechar ao clicar em link do menu mobile
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!menuOpen) return;
      menuOpen = false;
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      gsap.to(menu, { opacity: 0, yPercent: -4, duration: 0.3, ease: 'power2.in' });
    });
  });
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
