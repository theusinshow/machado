import { initLenis }         from './lenis.js';
import { initHero }          from './animations/hero.js';
import { initMarquee }       from './animations/marquee.js';
import { initScrollTriggers } from './animations/scroll-triggers.js';
import { initDiferenciais }  from './animations/diferenciais.js';
import { initStats }         from './animations/stats.js';
import { initCounters }      from './animations/counters.js';
import { initMagnetic }      from './animations/magnetic.js';
import { initProdutosTabs }  from './animations/produtos-tabs.js';
import { initNavbar }        from './animations/navbar.js';
import { initSobreGallery }  from './animations/sobre-gallery.js';
import { initButtonSwap }    from './animations/button-swap.js';
import { initYoutubeFacade } from './animations/youtube-facade.js';

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
