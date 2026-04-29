import { splitTextByChars } from './text-split.js';

export function initHero() {
  const heroKicker  = document.querySelector('.hero-kicker');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-subtitle');
  const heroCtas    = document.querySelector('.hero-ctas');
  const heroNotes   = document.querySelector('.hero-highlights');
  const heroMedia   = document.querySelector('.hero-media');
  const heroScroll  = document.querySelector('.hero-scroll');

  if (!heroTitle) return;

  const tl = gsap.timeline({ defaults: { ease: 'machado' } });

  // Split do título principal para revelar caractere por caractere
  const split = splitTextByChars(heroTitle);
  if (!split) return;

  gsap.set(split.chars, { yPercent: 110, opacity: 0 });
  gsap.set(heroTitle, { opacity: 1 });

  if (heroKicker) {
    tl.fromTo(heroKicker,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55 },
      0
    );
  }

  tl.to(split.chars, {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.025,
  }, heroKicker ? '-=0.15' : 0);

  if (heroSub) {
    tl.fromTo(heroSub,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );
  }

  if (heroCtas) {
    tl.fromTo(heroCtas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    );
  }

  if (heroNotes) {
    const noteItems = heroNotes.querySelectorAll('li');
    if (noteItems.length) {
      tl.fromTo(noteItems,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
        '-=0.3'
      );
    }
  }

  if (heroMedia) {
    tl.fromTo(heroMedia,
      { opacity: 0, scale: 1.06, x: 40 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2 },
      0.2
    );
  }

  if (heroScroll) {
    tl.fromTo(heroScroll,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );

    // Loop scroll indicator
    gsap.to(heroScroll.querySelector('.hero-scroll__line'), {
      scaleY: 0.3,
      transformOrigin: 'bottom',
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
}
