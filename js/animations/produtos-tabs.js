export function initProdutosTabs() {
  const cards = document.querySelectorAll('.produto-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.produto-card__img'), {
        scale: 1.06,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.produto-card__img'), {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  });
}
