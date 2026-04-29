export function initHero() {
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-subtitle');
  const heroCtas    = document.querySelector('.hero-ctas');
  const heroMedia   = document.querySelector('.hero-media');
  const heroScroll  = document.querySelector('.hero-scroll');

  if (!heroTitle) return;

  const tl = gsap.timeline({ defaults: { ease: 'machado' } });

  // Split title into chars
  const split = new SplitText(heroTitle, { type: 'chars, words' });
  gsap.set(split.chars, { yPercent: 110, opacity: 0 });
  gsap.set(heroTitle, { opacity: 1 });

  tl.to(split.chars, {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.025,
  });

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
