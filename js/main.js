import { initLenis }         from './lenis.js';
import { initLoader }        from './loader.js';
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
  document.documentElement.classList.add('js-ready');

  initLenis();
  initStats();

  initLoader().then(() => {
    initHero();
    initMarquee();
    initDiferenciais();
    initScrollTriggers();
    initCounters();
    initMagnetic();
    initProdutosTabs();
    initSobreGallery();
    initNavbar();
    initButtonSwap();
    initYoutubeFacade();
  });
});
