export function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (!cursor || !follower) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.08,
      ease: 'none',
    });

    gsap.to(follower, {
      x: mouseX,
      y: mouseY,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  const hoverTargets = document.querySelectorAll('a, button, [data-magnetic]');

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor--hover');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor--hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
  });
}
