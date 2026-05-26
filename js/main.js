import {
  initLenis,
  initHero,
  initMarquee,
  initScrollTriggers,
  initDiferenciais,
  initStats,
  initCounters,
  initMagnetic,
  initProdutosTabs,
  initNavbar,
  initSobreGallery,
  initButtonSwap,
  initYoutubeFacade,
} from './animations.bundle.js';

document.addEventListener('DOMContentLoaded', () => {
  // Crítico: roda imediatamente (acima do fold)
  initLenis();
  initNavbar();
  initHero();
  initStats();

  // Não-crítico: adia para idle para liberar main thread antes do LCP decode
  const deferredInit = () => {
    initMarquee();
    initDiferenciais();
    initScrollTriggers();
    initCounters();
    initMagnetic();
    initProdutosTabs();
    initSobreGallery();
    initButtonSwap();
    initYoutubeFacade();
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(deferredInit, { timeout: 300 });
  } else {
    setTimeout(deferredInit, 50);
  }
});
