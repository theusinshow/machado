export function initLoader() {
  return new Promise((resolve) => {
    const loader   = document.getElementById('loader');
    const fill     = document.querySelector('.loader__bar-fill');
    const countEl  = document.querySelector('.loader__count');

    if (!loader) { resolve(); return; }

    const safetyTimer = setTimeout(resolve, 5000);

    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(obj.val);
        if (fill)    fill.style.width = v + '%';
        if (countEl) countEl.textContent = v + '%';
      },
      onComplete() {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'machado',
          onComplete() {
            loader.style.display = 'none';
            clearTimeout(safetyTimer);
            resolve();
          },
        });
      },
    });
  });
}
