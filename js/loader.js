export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    if (!loader) { resolve(); return; }

    const squares = loader.querySelectorAll('.loader__square');
    const label = loader.querySelector('.loader__label');
    const hasSquares = Boolean(squares.length);

    const safetyTimer = setTimeout(() => {
      loader.style.display = 'none';
      resolve();
    }, 5000);

    if (hasSquares) {
      gsap.set(squares, {
        x: (index) => (index - ((squares.length - 1) / 2)) * -28,
        y: 24,
        rotation: (index) => (index % 2 === 0 ? -135 : 135),
        opacity: 0,
        transformOrigin: '50% 50%',
      });
    }

    if (label) {
      gsap.set(label, { opacity: 0, y: 10 });
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'machado' },
      onComplete() {
        loader.style.display = 'none';
        clearTimeout(safetyTimer);
        resolve();
      },
    });

    if (hasSquares) {
      timeline.to(squares, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
      });

      timeline.to(squares, {
        y: (index) => (index % 2 === 0 ? -4 : 4),
        duration: 0.18,
        stagger: 0.05,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut',
      }, '-=0.08');
    }

    if (label) {
      timeline.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, hasSquares ? '-=0.12' : 0);
    }

    timeline.to(loader, {
      yPercent: -100,
      duration: 0.9,
      delay: 0.75,
      ease: 'machado',
    });
  });
}
