export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    lerp: 0.1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}
