export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj    = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = Math.round(obj.val) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
        markers: false,
      },
    });
  });
}
