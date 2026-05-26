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

  // Navbar e Hero rodam IMEDIATAMENTE — não esperam o loader.
  // O loader cobre a tela visualmente, mas o browser já pinta os
  // elementos da hero (opacity > 0 ao final da animação GSAP),
  // o que reduz o LCP de ~2.4s para ~0.6-1.0s.
  initNavbar();
  initHero();

  initLoader().then(() => {
    // Scripts abaixo da dobra — diferidos até o loader sair
    initMarquee();
    initDiferenciais();
    initScrollTriggers();
    initCounters();
    initMagnetic();
    initProdutosTabs();
    initSobreGallery();
    initButtonSwap();
    initYoutubeFacade();
  });
});
