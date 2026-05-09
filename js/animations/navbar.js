/**
 * Navbar editorial.
 * @module animations/navbar
 */

export function initNavbar() {
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
  let themeFrame = null;

  function syncNavbarTheme() {
    themeFrame = null;
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

  function scheduleNavbarTheme() {
    if (themeFrame) return;
    themeFrame = window.requestAnimationFrame(syncNavbarTheme);
  }

  function updateScrolledState() {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > SCROLL_THRESHOLD);
    scheduleNavbarTheme();
  }

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

    tl.fromTo(panel.querySelectorAll('.navbar-panel__nav a'),
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
      '-=0.25'
    );

    tl.fromTo(panel.querySelectorAll('.navbar-panel__meta > *'),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      '-=0.35'
    );

    tl.fromTo(panel.querySelectorAll('.navbar-card'),
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
        scheduleNavbarTheme();
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

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => positionIndicator(link));
  });

  const nav = panel.querySelector('.navbar-panel__nav');
  if (nav) {
    nav.addEventListener('mouseleave', moveIndicatorToActive);
  }

  window.addEventListener('scroll', updateScrolledState, { passive: true });
  window.addEventListener('resize', () => {
    scheduleNavbarTheme();
    if (menuOpen) moveIndicatorToActive();
  }, { passive: true });

  updateScrolledState();
}
