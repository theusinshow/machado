/**
 * Produtos — Split Screen com scroll-driven pin
 * Espelha o padrão do diferenciais: GSAP ScrollTrigger pina o layout
 * e avança os produtos conforme o progresso do scroll.
 */

export function initProdutosTabs() {
  const section = document.querySelector('#produtos');
  if (!section) return;

  const items = Array.from(section.querySelectorAll('[data-produto]'));
  const imgs  = Array.from(section.querySelectorAll('[data-produto-img]'));
  if (!items.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersDesktop = window.matchMedia('(min-width: 1024px)');
  let activeIndex = -1;
  let pinTrigger = null;

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    items.forEach((item, i) => item.classList.toggle('is-active', i === index));
    imgs.forEach((img,  i) => img.classList.toggle('is-active',  i === index));
  }

  // Click e teclado sempre funcionam
  items.forEach((item, i) => {
    item.addEventListener('click', () => setActive(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(i);
      }
    });
  });

  if (reducedMotion) {
    setActive(0);
    return;
  }

  // Animação de entrada do header
  const header = section.querySelector('.produtos-list__header');
  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'machado',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      }
    );
  }

  // Animação de entrada dos itens
  gsap.fromTo(items,
    { opacity: 0, y: 24 },
    {
      opacity: (i) => (i === 0 ? 1 : 0.42),
      y: 0,
      duration: 0.65,
      ease: 'machado',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 68%',
        once: true,
      },
      onComplete() {
        gsap.set(items, { clearProps: 'opacity,transform' });
        setActive(0);
      },
    }
  );

  function initPin() {
    if (!prefersDesktop.matches || typeof ScrollTrigger === 'undefined') return;

    if (pinTrigger) {
      pinTrigger.kill();
      pinTrigger = null;
    }

    pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (items.length - 1) * 0.85}`,
      pin: section.querySelector('.produtos-split'),
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
      onUpdate(self) {
        const raw = Math.round(self.progress * (items.length - 1));
        setActive(Math.min(items.length - 1, Math.max(0, raw)));
      },
    });
  }

  setActive(0);
  initPin();

  prefersDesktop.addEventListener('change', () => {
    if (pinTrigger) { pinTrigger.kill(); pinTrigger = null; }
    initPin();
    setActive(0);
  });

  window.addEventListener('resize', () => {
    if (pinTrigger) pinTrigger.refresh();
  }, { passive: true });
}
